import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const router = useRouter();
  
  // State variables for form input
  const [username, setUsername] = useState(''); // Initial state is empty
  const [email, setEmail] = useState(''); // Initial state is empty
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // State to manage which section is being edited
  const [editing, setEditing] = useState(''); // 'username', 'email', or 'password'

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Handle saving changes
  const handleSaveChanges = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }
    alert('Changes saved.');
    setEditing(''); // Clear editing state after saving
  };

  return (
    <View style={styles.container}>
      {/* Left arrow button to go back to home */}
      <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1E567D" />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>

      {/* Display current user info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Username: {username || 'Not set'}</Text>
        <Text style={styles.infoLabel}>Email: {email || 'Not set'}</Text>
      </View>

      {/* Buttons to start editing username, email, or password */}
      <TouchableOpacity style={styles.editButton} onPress={() => setEditing('username')}>
        <Text style={styles.editButtonText}>Change Username</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={() => setEditing('email')}>
        <Text style={styles.editButtonText}>Change Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={() => setEditing('password')}>
        <Text style={styles.editButtonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Username input */}
      {editing === 'username' && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter new username"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Email input */}
      {editing === 'email' && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter new email"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Password change section */}
      {editing === 'password' && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Old Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Enter old password"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="#1E567D" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="#1E567D" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="#1E567D" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10, // Ensure it stays on top of other elements
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  saveButton: {
    backgroundColor: '#1E567D',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#1E567D',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
