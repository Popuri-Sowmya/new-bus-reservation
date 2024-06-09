import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export const generatePdf = async ({ source, destination, date, selectedBus, selectedSeats, names }) => {
  const doc = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Boarding Ticket</Text>
          <Text style={styles.subtitle}>Passenger Details:</Text>
          {names.map((name, index) => (
            <Text key={index} style={styles.text}>Passenger Name: {name} | Seat: {selectedSeats[index]}</Text>
          ))}
          <Text style={styles.subtitle}>Journey Details:</Text>
          <Text style={styles.text}>Source: {source}</Text>
          <Text style={styles.text}>Destination: {destination}</Text>
          <Text style={styles.text}>Departure Time: {selectedBus.departureTime}</Text>
          <Text style={styles.text}>Arrival Time: {selectedBus.arrivalTime}</Text>
          <Text style={styles.text}>Journey Date: {date}</Text>
          <Text style={styles.text}>Total Cost: {selectedBus.farePerSeat * names.length}</Text>
        </View>
      </Page>
    </Document>
  );

  const asBlob = await pdf(doc).toBlob();
  return asBlob;
};

export const TicketPdf = ({ source, destination, date, selectedBus, selectedSeats, names }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.title}>Boarding Ticket</Text>
              <Text style={styles.subtitle}>Passenger Details:</Text>
              {names.map((name, index) => (
                <Text key={index} style={styles.text}>Passenger Name: {name} | Seat: {selectedSeats[index]}</Text>
              ))}
              <Text style={styles.subtitle}>Journey Details:</Text>
              <Text style={styles.text}>Source: {source}</Text>
              <Text style={styles.text}>Destination: {destination}</Text>
              <Text style={styles.text}>Departure Time: {selectedBus.departureTime}</Text>
              <Text style={styles.text}>Arrival Time: {selectedBus.arrivalTime}</Text>
              <Text style={styles.text}>Journey Date: {date}</Text>
              <Text style={styles.text}>Total Cost: {selectedBus.farePerSeat * names.length}</Text>
            </View>
          </Page>
        </Document>
      }
      fileName="ticket.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download Ticket'
      }
    </PDFDownloadLink>
  );
};
