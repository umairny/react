export default function Loading (props) {
    console.log(props)
    return (
        <div className="loading">
            <h1>Loading</h1>
            <div className="lds-dual-ring"></div>
        </div>
    )
}