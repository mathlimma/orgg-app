import * as Notifications from 'expo-notifications';

const sendNotification = async (title, body, secondsDelay) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      seconds: secondsDelay,
    },
  });
};

const Notification = (taskName, type = 'start') => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
  const titleTxt = type === 'start' ? 'Tarefa iniciada' : 'Que tal parar um pouco?';
  const bodyTxt = type === 'start' ? `Você está fazendo: ${taskName}. Bom trabalho!` : 'Aproveite pra pegar um ar ou beber uma água.';
  const secondsDelay = type === 'start' ? 0 : 30;

  sendNotification(titleTxt, bodyTxt, secondsDelay);
};

export default Notification;
