const URL = "http://localhost:3000";

export async function TraerTabla(){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("GET", `${URL}/monedas`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    });
}

export async function CrearUna(crypto){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("POST", `${URL}/monedas`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(crypto));
    });
}

export async function EditarPorId(id, nuevaCrypto) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("PUT", `${URL}/monedas/${id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(nuevaCrypto));
    });
}

export async function EliminarPorId(id) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("DELETE", `${URL}/monedas/${id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    });
}

export async function EliminarTodo() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
                }
            }
        });
        xhr.open("DELETE", `${URL}/monedas`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    });
}



//--------------------------------------------------------------------------------------------------------------------------------

/*FUNCIONES CON FETCH*/
/*
export async function TraerTabla(){
    try {
        const response = await fetch(`${URL}/crypto`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("ERR " + response.status + " :" + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function CrearUna(crypto){
    try {
        const response = await fetch(`${URL}/crypto`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crypto)
        });
        if (!response.ok) {
            throw new Error("ERR " + response.status + " :" + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function EditarPorId(id, nuevaCrypto) {
    try {
        const response = await fetch(`${URL}/crypto/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaCrypto)
        });
        if (!response.ok) {
            throw new Error("ERR " + response.status + " :" + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function EliminarPorId(id) {
    try {
        const response = await fetch(`${URL}/crypto/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("ERR " + response.status + " :" + response.statusText);
        }
    } catch (error) {
        throw error;
    }
}

export async function EliminarTodo() {
    try {
        const response = await fetch(`${URL}/crypto`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("ERR " + response.status + " :" + response.statusText);
        }
    } catch (error) {
        throw error;
    }
}

*/


