import { atom } from "recoil";

const Admin_value = localStorage.getItem("isAdmin") === "true";

export const isAdmin = atom({

    key:"AuthAdmin",
    default:Admin_value || false ,  

})