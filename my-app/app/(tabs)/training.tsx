import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from 'expo-router';  // 用于页面导航

const TrainingPage = () => {
  const [isTraining, setIsTraining] = useState(false); // 是否正在进行训练
  const [timeLeft, setTimeLeft] = useState(60);  // 训练剩余时间
  const [totalSessions, setTotalSessions] = useState(0); // 记录训练总次数
  const [completedSessions, setCompletedSessions] = useState(0); // 记录完成的训练次数
  const [feedbackMessage, setFeedbackMessage] = useState(""); // 训练反馈消息
  const router = useRouter();  // 用于导航到其他页面

  // 模拟的眼部运动跟踪反馈
  const trackEyeMovement = () => {
    // 假设我们通过某种方式跟踪眼部运动，并提供反馈
    setFeedbackMessage("Focus on the center of the screen.");
  };

  // 训练开始或暂停
  const handleStartPause = () => {
    setIsTraining(!isTraining);
  };

  // 计时器更新训练进度
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isTraining && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
        trackEyeMovement(); // 在训练期间模拟眼部运动跟踪
      }, 1000);
    } else if (timeLeft <= 0) {
      clearInterval(timer);
      Alert.alert("Training Complete", "Well done! You have completed the session.");
      setIsTraining(false);
      setCompletedSessions(prev => prev + 1); // 增加完成的训练次数
      setTotalSessions(prev => prev + 1); // 增加总训练次数
    }
    return () => {
      if (timer) clearInterval(timer); // 清除定时器
    };
  }, [isTraining, timeLeft]);

  const handleBack = () => {
    router.push("/home");  // 返回主页
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eye Relaxation Training</Text>

      {/* 训练进度 */}
      <Text style={styles.timerText}>Time Left: {timeLeft} seconds</Text>

      {/* 训练控制按钮 */}
      <TouchableOpacity onPress={handleStartPause} style={styles.button}>
        <Text style={styles.buttonText}>{isTraining ? "Pause" : "Start"}</Text>
      </TouchableOpacity>

      {/* 返回按钮 */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

      {/* 训练反馈 */}
      {isTraining && (
        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
      )}

      {/* 训练完成数据反馈 */}
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Total Training Sessions: {totalSessions}</Text>
        <Text style={styles.dataText}>Completed Sessions: {completedSessions}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E567D",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    color: "#333",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#1E567D",
    padding: 15,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#FF6F61", // 使用鲜艳的背景颜色
    padding: 15,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",  // 设置字体颜色为白色，确保可见
    fontSize: 22,
    fontWeight: "bold",
  },
  feedbackText: {
    fontSize: 18,
    color: "#666",
    marginTop: 20,
    fontStyle: "italic",
  },
  dataContainer: {
    marginTop: 40,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    width: "80%",
    alignItems: "center",
  },
  dataText: {
    fontSize: 18,
    color: "#333",
    marginVertical: 5,
  },
});

export default TrainingPage;
