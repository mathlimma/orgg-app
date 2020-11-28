import * as Notifications from 'expo-notifications';

const sendNotification = async (taskName) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tarefa iniciada',
      body: `Você está a ${taskName}. Bom trabalho!`,
    },
    trigger: {
      seconds: 0,
    },
  });
};

const Notification = (taskName) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
  sendNotification(taskName);
};

export default Notification;
