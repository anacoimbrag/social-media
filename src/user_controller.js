import users from '../static/users.json' with { type: "json"}
import { shortestDistance } from './algorithms.js'
import { updateFile } from './file.js'

/**
 * List all user based on an optional filter for name or email
 * @param {string} filter 
 * @returns list of users
 */
export const listUsers = (filter) => {
    if (filter) {
        return users.filter(user =>
            user.first_name.includes(filter) ||
            user.last_name.includes(filter) ||
            user.email.includes(filter)
        )
    }
    return users
}

/**
 * Retrieve user from id
 * @param {Number} id 
 * @returns user
 */
export const retrieveUser = (id) => {
    return users.find(user => user.id == Number(id))
}

/**
 * Create new user from attributes
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {string} email 
 * @param {string} gender 
 * @param {Number[]} connections
 * @returns new user
 */
export const addUser = (first_name, last_name, email, gender, connections) => {
    if (users.find(user => user.email == email))
        throw new Error('User already exists!')

    const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        gender,
        connections
    }

    if (users.push(newUser))
        updateFile(users)
    else
        throw new Error('Some problem occured')

    return newUser
}

/**
 * Update some attributes of the user
 * @param {Number} id 
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {string} email 
 * @param {string} gender 
 * @param {Array} connections
 * @returns 
 */
export const updateUser = ({ id, first_name, last_name, email, gender, connections }) => {
    let updatedUser = null
    users.forEach(user => {
        if (user.id === id) {
            if (first_name)
                user.first_name = first_name

            if (last_name)
                user.last_name = last_name

            if (email)
                user.email = email

            if (gender)
                user.gender = gender

            if (connections !== user.connections)
                user.connections = connections

            updatedUser = user
        }
    })

    if (!updatedUser)
        throw new Error('User not found!')
    else
        updateFile(users)

    return updatedUser
}

/**
 * Remove user that matches id
 * @param {Number} id 
 * @returns the new list without the deleted user
 */
export const removeUser = (id) => {
    const newList = users.filter(user => user.id !== id)

    updateFile(newList)

    return newList
}

/**
 * Get shortest relationship distance between two users id
 * @param {Number} id1 
 * @param {Number} id2 
 * @returns 
 */
export const relationshipDistance = (id1, id2) => {
    const userConnections = {}
    listUsers().forEach(({ id, connections }) =>
        userConnections[id] = connections
    )
    console.log(userConnections)

    return shortestDistance(userConnections, id1, id2)
}

export default {
    listUsers,
    retrieveUser,
    addUser,
    updateUser,
    removeUser,
    relationshipDistance
}