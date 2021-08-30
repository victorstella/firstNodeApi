import request from 'supertest'
import { app } from './server'

let token = ''

// LOGIN
beforeAll(done => {
  request(app)
    .post('/login')
    .send({
      user: 'victor',
      password: 'opa'
    })
    .end((err, res) => {
      token = res.body.token as string
      done()
    })
})

describe('Server services', () => {
  console.log(token)

  // POST
  it("Should be able to post new a user's info", async () => {
    const newUser = {
      uuid: '2',
      email: 'kaminki@excel.com',
      name: 'lucas',
      address: {
        user_address: 'rua tal'
      }
    }
    await request(app)
      .post('/users')
      .set('authorization', `Bearer ${token}`)
      .send(newUser)
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject(newUser)
      })
  })

  it("Should not be able to post new a user's info without authentication", async () => {
    const newUser = {
      uuid: '2',
      email: 'kaminki@excel.com',
      name: 'lucas',
      address: {
        user_address: 'rua tal'
      }
    }
    await request(app).post('/users').send(newUser).then(res => expect(res.status).toBe(401))
  })

  // GET
  it("Should be able to get a user's info", async () => {
    const user = {
      uuid: '1',
      email: 'victorpaiva@excel.com.br',
      name: 'lucas'
    }
    await request(app).get('/users/1').set('authorization', `Bearer ${token}`).send().then(res => {
      expect(res.status).toBe(200)
      expect(res.body.data).toMatchObject(user)
    })
  })

  it("Should not be able to get a user's info without authentication", async () =>
    await request(app).get('/users/1').send().then(res => expect(res.status).toBe(401))
  )

  // PATCH
  it("Should be able to change a user's info", async () => {
    const changedUser = {
      uuid: '2',
      name: 'victor'
    }
    await request(app)
      .patch('/users/2')
      .set('authorization', `Bearer ${token}`)
      .send({ name: 'victor' })
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body.data).toMatchObject(changedUser)
      })
  })

  it("Should not be able to change a user's info without authentication", async () => {
    const changedUser = {
      uuid: '2',
      name: 'victor'
    }
    await request(app).patch('/users/2').send({ name: 'victor' }).then(res => expect(res.status).toBe(401))
  })

  // DELETE
  it("Should be able to delete a user's info", async () => {
    await request(app)
      .delete('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ uuid: '2' })
      .then(res => {
        expect(res.status).toBe(200)
        expect(res.body.data).toMatchObject({ uuid: '2' })
      })
  })

  it("Should not be able to delete a user's info without authentication", async () => {
    await request(app).delete('/').send({ uuid: '2' }).then(res => expect(res.status).toBe(401))
  })

  // LOGOUT
  it("Should be able to logout", async () => {
    await request(app).post('/logout').send({
      uuid: '1'
    }).then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('auth')
      token = ''
    })
  })
})