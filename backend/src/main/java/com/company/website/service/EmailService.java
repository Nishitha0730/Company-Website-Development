package com.company.website.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.port}")
    private String port;

    @Value("${app.base-url}")
    private String baseUrl;

    public void sendVerificationEmail(String recipientEmail, String verificationLink) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(username));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
        message.setSubject("Verify Your Email Address");

        String msgContent = "<h2>Welcome to Our Application!</h2>" +
                "<p>Please click the button below to verify your email address:</p>" +
                "<a href=\"" + verificationLink + "\" style=\"background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">Verify Email</a>" +
                "<p>If you didn't create an account, please ignore this email.</p>" +
                "<p>This link will expire in 24 hours.</p>";

        message.setContent(msgContent, "text/html; charset=utf-8");

        Transport.send(message);
    }
}