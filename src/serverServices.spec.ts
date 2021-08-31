import request from 'supertest'
import { app } from './server'
import { CreateSessionService } from './services/sessions/CreateSessionService'

const createSessionService = new CreateSessionService()

let token = ''

describe('Server services', () => {
  // LOGIN
  beforeAll(async () => {
    const log = await createSessionService.run({ user: 'victor', password: 'opa' })
    token = log.token
  })

  // POST
  it("Should be able to post new a user's info", async () => {
    const newUser = {
      uuid: '2',
      email: 'victor@excel.com',
      name: 'victor',
      address: {
        user_address: '1st street'
      }
    }
    await request(app)
      .post('/users/')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
          ...newUser,
          createdBy: null,
          address: {
            user_address: '1st street',
            user_id: '2'
          }
        })
      })
  })

  it("Should not be able to post new a user's info without authentication", async () => {
    const newUser = {
      uuid: '2',
      email: 'victor@excel.com',
      name: 'victor',
      address: {
        user_address: '1st street'
      }
    }
    await request(app).post('/users/').send(newUser).then(res => expect(res.status).toBe(401))
  })

  // GET USER
  it("Should be able to get a user's info", async () => {
    const user = {
      uuid: '1',
      email: 'example@example.com',
      name: 'victor',
      createdBy: null
    }
    await request(app).get('/users/1').set('Authorization', `Bearer ${token}`).send().then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toMatchObject(user)
    })
  })

  it("Should not be able to get a user's info without authentication", async () =>
    await request(app).get('/users/1').send().then(res => expect(res.status).toBe(401))
  )

  // GET ALL USERS
  it("Should be able to get a user's info", async () => {
    const users = [
      {
        uuid: '1',
        email: 'example@example.com',
        name: 'victor',
        createdBy: null,
        updateBy: null
      },
      {
        uuid: '2',
        email: 'victor@excel.com',
        name: 'victor',
        createdBy: null,
        updateBy: null
      }
    ]
    await request(app).get('/users/').set('Authorization', `Bearer ${token}`).send().then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toMatchObject(users)
    })
  })

  it("Should not be able to get a user's info without authentication", async () =>
    await request(app).get('/users/').send().then(res => expect(res.status).toBe(401))
  )

  // PATCH
  it("Should be able to change a user's info", async () => {
    const changedUser = {
      uuid: '1',
      email: 'example@example.com',
      name: 'victor',
      createdBy: null

    }
    await request(app)
      .patch('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'victor' })
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject(changedUser)
      })
  })

  it("Should not be able to change a user's info without authentication", async () => {
    await request(app).patch('/users/1').send({ name: 'lucas' }).then(res => expect(res.status).toBe(401))
  })

  // DELETE
  it("Should be able to delete a user's info", async () => {
    await request(app)
      .delete('/users/2')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body).toMatch("2")
      })
  })

  it("Should not be able to delete a user's info without authentication", async () => {
    await request(app).delete('/users/2').send().then(res => expect(res.status).toBe(401))
  })

})