export default function Badge({ textContent }) {

    const getBackgroudColor = (textContent) => {
        return textContent === 'APROBADO' ? 'green' : 'gray';
    }

    const styles = {
        container: {
            backgroundColor: getBackgroudColor(textContent),
            padding: '10px',
            borderRadius: '20px',
            display: 'inline-block',
        },
        text: {
            color: 'white',
            margin: 0,
            fontWeight: 'bold',
        },
    };

    return (
        <>
            <div style={styles.container}>
                <p style={styles.text}>{textContent}</p>
            </div>
        </>
    );
};