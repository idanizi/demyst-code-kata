import './App.scss'

function App() {

    const fetchRoot = () => {
        fetch('/api').then(async (response) => {
            if (response.ok) {
                try {
                    await response.json()
                } catch (err) {
                    console.error(err)
                }
                return
            }

            console.error("response not ok:", response.status, response.statusText)
        })
    }

    return (
        <>
            <button onClick={fetchRoot}>
                fetch root
            </button>
        </>
    )
}

export default App
