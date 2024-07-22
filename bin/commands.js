import pool from '../db/db.js'

export async function createTodo(title, description){
    if(!title) console.error("ERROR creating TODO, Title Not provided")
    console.log("Title: ", title)
    if(description){
        console.log("Description:", description)
    }
    console.log("Created TODO");
}

export async function getTodos(){
    return "GOT ALL TODOs";
}

export async function getTodoById(id){
    console.log(id, "TODO FOUND");
}

export async function updateTodo(id, title, description, status){
    if(!id){
        console.error('ID NOT PROVIDED')
    }
    console.log(id, title, description, status);
}

export async function deleteTodo(id){
    if(!id){
        console.error('ID NOT PROVIDED')
    }
    console.log(id, "TODO deleted Successfully");
}