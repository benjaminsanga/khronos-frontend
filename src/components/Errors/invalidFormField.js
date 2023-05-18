
const styles = {
    invalid: {
        margin: '10px 0 0',
        color: '#dc3545',
        fontSize: '12px'
    }
}
export const InvalidFormField = ({message}) => {
    return <span style={styles.invalid}>{message}</span>
}