import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

// API Base URL (fallback if environment variable is missing)
const API_BASE_URL =  "https://cse-453-vitalgaze.onrender.com";

export default function ProfilePage() {
  const router = useRouter();
  
  // State for displaying current profile data (from database)
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  
  // State variables for form input (what user is editing)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  
  // State to manage which section is being edited
  const [editing, setEditing] = useState(''); // 'username', 'email', or 'password'

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Get JWT token from AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.warn('No auth token found. Using offline mode.');
        return null;
      }      
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      Alert.alert('Authentication Error', 'Unable to verify your session');
      return null;
    }
  };

  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      setFetchingProfile(true);
      const token = await getToken();
      if (!token) return;
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        // Set both current display values and form values
        setCurrentUsername(data.user.username);
        setCurrentEmail(data.user.email);
        setUsername(data.username);
        setEmail(data.email);
      } else {
        Alert.alert('Profile Error', data.message || 'Unable to retrieve your profile information');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Connection Error', 'Unable to connect to the server. Please check your connection and try again.');
    } finally {
      setFetchingProfile(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Cancel editing
  const cancelEditing = () => {
    setEditing('');
    // Reset form fields to current values
    setUsername(currentUsername);
    setEmail(currentEmail);
    // Reset password fields if canceling password edit
    if (editing === 'password') {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // Handle saving username changes
  const handleSaveUsername = async () => {
    if (!username.trim()) {
      Alert.alert('Invalid Input', 'Username cannot be empty');
      return;
    }

    try {
      setIsLoading(true);
      const token = await getToken();
      if (!token) return;
      const response = await fetch(`${API_BASE_URL}/api/user/username`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', data.message || 'Username updated successfully');
        setEditing('');
        // Update current username after successful update
        setCurrentUsername(username);
      } else {
        Alert.alert('Update Failed', data.message || 'Unable to update username');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      Alert.alert('Connection Error', 'Unable to update username. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving email changes
  const handleSaveEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      Alert.alert('Invalid Input', 'Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      const token = await getToken();
      if (!token) return;
      const response = await fetch(`${API_BASE_URL}/api/user/email`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', data.message || 'Email updated successfully');
        setEditing('');
        // Update current email after successful update
        setCurrentEmail(email);
      } else {
        Alert.alert('Update Failed', data.message || 'Unable to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      Alert.alert('Connection Error', 'Unable to update email. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving password changes
  const handleSavePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Invalid Input', 'All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Password Mismatch', 'New password and confirmation do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Invalid Password', 'New password must be at least 6 characters');
      return;
    }

    try {
      setIsLoading(true);
      const token = await getToken();
      if (!token) return;
      const response = await fetch(`${API_BASE_URL}/api/user/password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', data.message || 'Password updated successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setEditing('');
      } else {
        Alert.alert('Update Failed', data.message || 'Unable to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Connection Error', 'Unable to update password. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving changes based on which field is being edited
  const handleSaveChanges = () => {
    console.log(`Editing: ${editing}`);
    switch (editing) {
      case 'username':
        console.log('Saving username...');
        handleSaveUsername();
        break;
      case 'email':
        console.log('Saving email...');
        handleSaveEmail();
        break;
      case 'password':
        console.log('Saving password...');
        handleSavePassword();
        break;
      default:
        console.log('No changes to save.');
        break;
    }
  };

  if (fetchingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E567D" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={30} color="#1E567D" />
          </TouchableOpacity>
          <Text style={styles.title}>My Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{currentUsername ? currentUsername.charAt(0).toUpperCase() : '?'}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={22} color="#1E567D" />
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{currentUsername}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={22} color="#1E567D" />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{currentEmail}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Account Settings</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => setEditing('username')}
            disabled={isLoading}
          >
            <Ionicons name="create-outline" size={20} color="#FFF" />
            <Text style={styles.editButtonText}>Change Username</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => setEditing('email')}
            disabled={isLoading}
          >
            <Ionicons name="mail-outline" size={20} color="#FFF" />
            <Text style={styles.editButtonText}>Change Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => setEditing('password')}
            disabled={isLoading}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#FFF" />
            <Text style={styles.editButtonText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Forms */}
        {editing !== '' && (
          <View style={styles.formCard}>
            {/* Username input */}
            {editing === 'username' && (
              <View style={styles.inputContainer}>
                <Text style={styles.formTitle}>Update Username</Text>
                <Text style={styles.label}>New Username</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter new username"
                  autoCapitalize="none"
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={cancelEditing}
                    disabled={isLoading}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.saveButton, isLoading && styles.disabledButton]} 
                    onPress={handleSaveChanges}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Email input */}
            {editing === 'email' && (
              <View style={styles.inputContainer}>
                <Text style={styles.formTitle}>Update Email</Text>
                <Text style={styles.label}>New Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter new email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={cancelEditing}
                    disabled={isLoading}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.saveButton, isLoading && styles.disabledButton]} 
                    onPress={handleSaveChanges}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Password change section */}
            {editing === 'password' && (
              <View style={styles.inputContainer}>
                <Text style={styles.formTitle}>Update Password</Text>
                <Text style={styles.label}>Current Password</Text>
                <View style={styles.passwordInputWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    placeholder="Enter current password"
                    secureTextEntry={!passwordVisible}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                    <Ionicons 
                      name={passwordVisible ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#1E567D" 
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>New Password</Text>
                <View style={styles.passwordInputWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Enter new password"
                    secureTextEntry={!passwordVisible}
                  />
                </View>

                <Text style={styles.label}>Confirm New Password</Text>
                <View style={styles.passwordInputWrapper}>
                  <TextInput
                    style={styles.passwordInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm new password"
                    secureTextEntry={!passwordVisible}
                  />
                </View>
                <Text style={styles.passwordHint}>Password must be at least 6 characters</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={cancelEditing}
                    disabled={isLoading}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.saveButton, isLoading && styles.disabledButton]} 
                    onPress={handleSaveChanges}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1E567D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    marginLeft: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E567D',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E567D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  infoLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#555555',
    width: 85,
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
    color: '#333333',
    fontWeight: '500',
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555555',
  },
  buttonsContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#1E567D',
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E567D',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  passwordHint: {
    fontSize: 12,
    color: '#888888',
    marginTop: -10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#1E567D',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#555555',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
});