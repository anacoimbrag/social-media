const file = require('../src/file')
const controller = require('../src/user_controller')
const algorithm = require('../src/algorithms')

jest.mock('fs')
const fileSpy = jest.spyOn(file, 'updateFile')

const algorithmSpy = jest.spyOn(algorithm, 'shortestDistance')

test('get all users without filter', () => {
    expect(controller.listUsers()).toHaveLength(10)
})

test('get users with filter of .com email', () => {
    expect(controller.listUsers('.com')).toHaveLength(4)
})

test('get user from id 1', () => {
    expect(controller.retrieveUser(1).first_name).toEqual('Leora')
})

test('add new random user', () => {
    const first_name = 'Jane'
    const last_name = 'Doe'
    const email = 'jane@doe.com'
    const gender = 'Female'
    const connections = [1, 4]
    const newUser = controller.addUser(first_name, last_name, email, gender, connections)

    expect(newUser).toEqual({ id: 11, first_name, last_name, email, gender, connections })
    expect(controller.listUsers()).toHaveLength(11)

    expect(fileSpy).toHaveBeenCalled()
})

test('update user 3 with a new last name and connection', () => {
    const updatedUser = controller.updateUser({ id: 3, last_name: 'Modified', connections: [2, 4, 5] })
    expect(updatedUser).toEqual({ id: 3, first_name: 'Jillie', last_name: 'Modified', email: 'jburkill2@ezinearticles.com', gender: 'Female', connections: [2, 4, 5] })

    expect(fileSpy).toHaveBeenCalled()
})

test('delete user with id 5', () => {
    const filteredList = controller.removeUser(5)
    expect(filteredList).toHaveLength(10)

    expect(fileSpy).toHaveBeenCalledWith(filteredList)
})

test('get shortest distance between users 1 and 10', () => {
    expect(controller.relationshipDistance(1, 10)).toBe(3)
    expect(algorithmSpy).toHaveBeenNthCalledWith(1,
        {
            '1': [2, 4, 6, 8],
            '2': [1, 3],
            '3': [2, 4, 5],
            '4': [1, 3, 6, 9],
            '5': [3, 6, 7, 8, 9, 10],
            '6': [3, 4, 5, 7],
            '7': [5, 6, 8, 9, 10],
            '8': [1, 5, 7],
            '9': [4, 5, 7, 10],
            '10': [1, 5, 7, 9],
            '11': [1, 4]
        }, 1, 10)
})