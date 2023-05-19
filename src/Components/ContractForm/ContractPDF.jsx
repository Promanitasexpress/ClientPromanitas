import React from "react";
import { PDFViewer, Document, Page, View, Text } from "@react-pdf/renderer";

const ContractPDF = (props) => {
  const { contractId, username, detail, payment } = props;


  const currentDate = new Date().toLocaleDateString();

  return (
    <PDFViewer width="40%" height="450px">
      <Document>
        <Page size="A7" style={styles.page} wrap>
        <View style={styles.section}> 
            <Text style={styles.label}>Contrato ID:</Text>
            <View style={styles.line} />
            <Text style={styles.value}>{contractId}</Text>
            <Text style={styles.label}>Usuario:</Text>
            <View style={styles.line} />
            <Text style={styles.value}>{username}</Text>
            <Text style={styles.label}>Detalle:</Text>
            <Text style={styles.value}>{detail}</Text>
            <Text style={styles.label}>Payment:</Text>
            <Text style={styles.value}>{payment}</Text>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{currentDate}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = {
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    height: 'fit-content',
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 12, 
    marginBottom: 3,
  },
    line: {
    borderBottom: '1px solid black',
    marginBottom: 5,
  },
};



export default ContractPDF;