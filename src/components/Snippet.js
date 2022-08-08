function Snippet(props) {
    return (
        props.codeSnip &&
        <figure>
            <pre>
                <code>
                    {props.codeSnip}
                </code>
            </pre>
        </figure>
    );
}

export default Snippet;