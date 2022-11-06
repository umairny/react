export default function ShowError (props) {
    //console.log(props)
    return (
        <div className="error">
            <h1>Error some thing wrong.</h1>
            <hr />
            <h3>{props.err.message}</h3>
            <hr />
            <h1>404</h1>
        </div>
    )
}