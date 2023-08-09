import request from "./request"

export async function getAboutMe(){
    return await request.get("/api/about")
}