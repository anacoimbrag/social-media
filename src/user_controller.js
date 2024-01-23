'use strict'

import users from '../static/users.json' with { type: "json"}
import { shortestDistance } from './algorithms.js'

/** 
 * list all users based on an optional filter
 */
export const listUsers = (filter) => {
    if (filter) {
        return users.filter(user => {
            user.first_name.includes(filter) ||
                user.last_name.includes(filter) ||
                user.email.includes(filter)
        })
    }
    return users
}

/**
 * retrieve specific user by id
 */
export const retrieveUser = (id) => {
    return users.find(user => { user.id == id })
}

export const addUser = (first_name, last_name, email, gender) => {
    if (users.find(user => user.email == email))
        throw new Error('User already exists!')

    const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        gender
    }

    users.push(newUser);
    /* important to persist this change, wheather on DB or file */

    return newUser
}

export const updateUser = (id, first_name, last_name, email, gender) => {
    const user = retrieveUser(id)
    if (!user)
        throw new Error('User not found!')

    if (first_name)
        user.first_name = first_name

    if (last_name)
        user.last_name = last_name

    if (email)
        user.email = email

    if (gender)
        user.gender = gender

    /* important to persist this change, wheather on DB or file */

    return user
}

export const removeUser = (id) => {
    const newList = users.filter(user => user.id != id)

    /* important to persist this change, wheather on DB or file */

    return newList
}

export const relationshipDistance = (id1, id2) => {
    const graph = {}
    listUsers().forEach(({ id, connections }) =>
        graph[id] = connections
    )

    return shortestDistance(graph, id1, id2)
}