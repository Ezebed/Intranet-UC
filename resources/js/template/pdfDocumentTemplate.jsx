import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logoUC from './img/logoUC.png';
import LogoFacyt from './img/logoFacyt.png';

const months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
};

const styles = StyleSheet.create({
    image: {
        width: 60,
    },
    content: {
        marginBottom: '40pt'
    },
    logo: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',        
    },
    logoHeader: {
        marginTop: '20pt',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        textAlign: 'center',
        fontWeight: 700,
        fontFamily: 'Times-Bold',
        fontSize: '10pt',
    },
    serialNumberTitle: {
        fontFamily: 'Times-Italic',
        fontSize: '10pt',
    },
    serialNumberView: {
        marginTop: '12pt',
        width: '50%',
        alignItems: 'center',
    },
    dateView: {
        textAlign: 'right',
        fontFamily: 'Helvetica',
        fontSize: '12pt',
        marginRight: '80pt'
    },
    principalMargin: {
        paddingLeft: '60pt',
        paddingRight: '60pt',
        paddingTop: '20pt',
        paddingBottom: '60pt',
    },
    margin: {
        marginLeft: '80pt'
    },
    directedToText: {
        fontFamily: 'Helvetica',
        fontSize: '12pt'
    },
    directedToTextBold: {
        fontFamily: 'Helvetica-Bold',
        fontSize: '12pt',
    },
    descriptionView: {
        marginLeft: '80pt',
        marginTop: '40pt',
        marginRight: '80pt'
    },
    descriptionText: {
        fontSize: '12pt',
        fontFamily: 'Helvetica',
        textAlign: 'justify'
    },
    applicantView: {
        marginTop: '200pt',
        display: 'flex',
        alignItems: 'center'
    },
    applicantText: {
        fontSize: '12pt',
        fontFamily: 'Helvetica',
        textAlign: 'center'
    },
    applicantTextBold: {
        fontSize: '12pt',
        fontFamily: 'Helvetica-Bold',
        textAlign: 'center'
    },
    footerView: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '100pt',
        marginRight: '100pt',
        marginTop: '160pt'
    },
    footerText: {
        fontSize: '8pt',
        fontFamily: 'Times-Italic',
        textAlign: 'center'
    },
    footerTextBold: {
        fontSize: '12pt',
        fontFamily: 'Times-BoldItalic',
        textAlign: 'center'
    }
});

function PDF({serial_number, created_at, directed_to, directedToIP, applicantToIp, applicant, description, image}) {
    let dateElements =  created_at.split('-');
    let mes = months[parseInt(dateElements[1], 10)-1];
    console.log(image);
    return (
        <Document>
            <Page>
                <View style={styles.content}>
                    <View style={styles.logoHeader}>
                        <View style={styles.logo}>
                            <Text style={styles.headerTitle}>Universidad de Carabobo</Text>
                            <Text style={styles.headerTitle}>Facultad Experimental de Ciencias y Tecnología</Text>
                            <Image src={logoUC} style={styles.image}/>
                            <Text style={styles.headerTitle}>Departamento de Computación</Text>
                        </View>
                        <View style={styles.logo}>
                            <Image src={LogoFacyt} style={styles.image}/>                
                        </View>
                    </View>
                    <View style={styles.serialNumberView}>
                        <Text style={styles.serialNumberTitle}>Nro. {serial_number}</Text>
                    </View>
                    <View >
                        <Text style={styles.dateView}>Naguanagua, {dateElements[0]} de {mes} del {dateElements[2]}</Text>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.directedToText}>Ciudadano:</Text>
                        <Text style={styles.directedToTextBold}>Prof. {directed_to}</Text>
                        <Text style={styles.directedToTextBold}>{directedToIP}</Text>
                        <Text style={styles.directedToText}>FACyT - U.C.</Text>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>
                            {description}
                        </Text>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>Sin más a que hacer referencia, se despide.</Text>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>Atentamente,</Text>
                    </View>
                    <View style={styles.applicantView}>
                        <Image src={image} style={styles.image}/>
                        <Text style={styles.applicantTextBold}>Prof. {applicant}</Text>
                        <Text style={styles.applicantText}>{applicantToIp}</Text>
                        <Text style={styles.applicantText}>Departamento de Computación</Text>
                    </View>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerTextBold}>... Luz de una tierra inmortal</Text>
                    <Text style={styles.footerText}>
                        Universidad de Carabobo Facultad Experimental de Ciencias y Tecnología, Departamento de Computación. Campus Bárbula
                        Telf. (0241) 6004000 Ext. 375200 e-mail: computacionfacyt@gmail.com. Valencia, Edo. Carabobo
                    </Text>
                </View>
            </Page>
        </Document>
    )
}

export default PDF;