import { connect } from "mongoose";

export async function mongoConnect(){
    await connect("mongodb://localhost:27017/backend-02");
}