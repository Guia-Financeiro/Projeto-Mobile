import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CalculoGastosScreen = () => {
  const [renda, setRenda] = useState('');
  const [despesas, setDespesas] = useState([{ id: 1, nome: '', valor: '' }]);
  const [resultado, setResultado] = useState(null);

  const addDespesa = () => {
    setDespesas([...despesas, { id: Date.now(), nome: '', valor: '' }]);
  };

  const removeDespesa = (id) => {
    setDespesas(despesas.filter(item => item.id !== id));
  };

  const handleDespesaChange = (id, field, value) => {
    const newDespesas = despesas.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setDespesas(newDespesas);
  };

  const handleCalcular = () => {
    const rendaNum = parseFloat(renda);
    if (isNaN(rendaNum) || rendaNum <= 0) {
      Alert.alert("Erro", "Por favor, insira uma renda válida.");
      return;
    }

    const totalDespesas = despesas.reduce((acc, item) => {
      const valorNum = parseFloat(item.valor);
      return acc + (isNaN(valorNum) ? 0 : valorNum);
    }, 0);
    
    const saldo = rendaNum - totalDespesas;
    const percentual = (totalDespesas / rendaNum) * 100;

    setResultado({
        totalDespesas: totalDespesas.toFixed(2),
        saldo: saldo.toFixed(2),
        percentual: percentual.toFixed(1)
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f0f4f8'}}>
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Renda Mensal (R$)</Text>
      <TextInput style={styles.input} value={renda} onChangeText={setRenda} keyboardType="numeric" placeholder="Ex: 3500.00" />
      
      <Text style={styles.label}>Despesas Fixas</Text>
      {despesas.map((item, index) => (
          <View key={item.id} style={styles.despesaItem}>
            <TextInput style={[styles.input, styles.despesaInput]} placeholder="Nome da despesa" value={item.nome} onChangeText={(text) => handleDespesaChange(item.id, 'nome', text)} />
            <TextInput style={[styles.input, styles.valorInput]} placeholder="Valor" value={item.valor} onChangeText={(text) => handleDespesaChange(item.id, 'valor', text)} keyboardType="numeric" />
            <TouchableOpacity onPress={() => removeDespesa(item.id)}>
              <Ionicons name="remove-circle" size={24} color="#f56565" />
            </TouchableOpacity>
          </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addDespesa}>
        <Text style={styles.addButtonText}>Adicionar Despesa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.calcButton} onPress={handleCalcular}>
        <Text style={styles.calcButtonText}>Calcular Gastos</Text>
      </TouchableOpacity>

      {resultado && (
          <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoTitle}>Resumo Financeiro</Text>
              <Text style={styles.resultadoText}>Total de Despesas: R$ {resultado.totalDespesas}</Text>
              <Text style={styles.resultadoText}>Saldo Restante: R$ {resultado.saldo}</Text>
              <Text style={styles.resultadoText}>Comprometimento da Renda: {resultado.percentual}%</Text>
          </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 18, fontWeight: 'bold', color: '#4a5568', marginBottom: 10 },
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#e2e8f0' },
    despesaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    despesaInput: { flex: 1, marginRight: 10 },
    valorInput: { width: 100, marginRight: 10 },
    addButton: { backgroundColor: '#a0aec0', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
    addButtonText: { color: '#fff', fontWeight: 'bold' },
    calcButton: { backgroundColor: '#3182ce', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
    calcButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    resultadoContainer: { marginTop: 30, padding: 20, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0'},
    resultadoTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#1a202c' },
    resultadoText: { fontSize: 16, color: '#2d3748', marginBottom: 5}
});

export default CalculoGastosScreen;
