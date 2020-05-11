package com.spring.angular.helper;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

public class SendMail {

    public static String sendmail(String toEmail) throws AddressException, MessagingException, IOException {
        String message;
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(Contains.MAIL.MAIL_HUNG, Contains.MAIL.PASSWORD);
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(Contains.MAIL.MAIL_HUNG, false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
        msg.setSubject(Contains.MAIL.MAIL_TITLE);
        Integer math = (int) ((Math.random() * 9999) + 1000);
        msg.setContent(Contains.MAIL.MAIL_CONTENT + math, "text/html");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(Contains.MAIL.MAIL_CONTENT + math, "text/html");

//        Multipart multipart = new MimeMultipart();
//        multipart.addBodyPart(messageBodyPart);
//        MimeBodyPart attachPart = new MimeBodyPart();

//        attachPart.attachFile("/var/tmp/image19.png");
//        multipart.addBodyPart(attachPart);
//        msg.setContent(multipart);
        Transport.send(msg);
        message = Contains.SUCCESS;
        return message;
    }
}
