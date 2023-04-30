export const exampleFetch = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${Math.round(Math.random() * 100)}`)
    const data = await response.json()
    return data
}