export interface Item {
    userid: string,
    created: string,
    description: string,
    complete: boolean
}



export async function getItems(userid: string) {
    let response = await fetch(`${todoConfig.apiHost}/items/${userid}`);
    return response.json() as Promise<Item[]>;
}

export async function setComplete(item: Item, complete: boolean) {
    let response = await fetch(`${todoConfig.apiHost}/items/${item.userid}/${item.created}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete }),
    });
    return response.ok;
}

export async function removeItem(item: Item) {
    let response = await fetch(`${todoConfig.apiHost}/items/${item.userid}/${item.created}`, {
        method: 'DELETE',
        mode: 'cors'
    });
    return response.ok;
}

export async function addItem(userid: string, description: string) {
    let response = await fetch(`${todoConfig.apiHost}/items/${userid}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
    });
    return response.json();
}
