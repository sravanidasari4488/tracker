import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const gunturRoutes = ['VV1', 'VV2', 'VV3', 'VV4', 'VV5', 'VV6', 'VV7', 'VV8', 'VV9', 'VV10', 'VV11', 'VV12', 'VV13', 'VV14', 'VV15'];
const vijayawadaRoutes = ['VV16', 'VV17', 'VV18', 'VV19', 'VV20', 'VV21', 'VV22', 'VV23', 'VV24', 'VV25', 'VV26', 'VV27', 'VV28', 'VV29', 'VV30'];
const facultyRoutes=['FV31','FV32','FV33','FV34','FV35','FV36','FV37','FV38','FV39','FV40']
const MapPage: React.FC = () => {
  const handleGoBack = () => {
    console.log('Navigating back to Home Page');
  };

  const renderRoutes = (routes: string[]) =>
    routes.map((route, index) => (
      <TouchableOpacity key={index} style={styles.routeCard}>
        <Text style={styles.routeText}>{route}</Text>
      </TouchableOpacity>
    ));

  return (
    <ScrollView style={styles.container}>
   

      {/* Title */}
      <Text style={styles.title}>Bus Routes</Text>

      {/* Guntur Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guntur</Text>
        <View style={styles.routesContainer}>{renderRoutes(gunturRoutes)}</View>
      </View>

      {/* Vijayawada Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vijayawada</Text>
        <View style={styles.routesContainer}>{renderRoutes(vijayawadaRoutes)}</View>
      </View>
      {/* Faculty Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Faculty buses</Text>
        <View style={styles.routesContainer}>{renderRoutes(facultyRoutes)}</View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007aff',
    marginTop: 80,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 15,
    textAlign: 'left',
  },
  routesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  routeCard: {
    backgroundColor: 'white',
    width: '48%',
    height: 80,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MapPage;
