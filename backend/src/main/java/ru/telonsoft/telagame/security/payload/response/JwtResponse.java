package ru.telonsoft.telagame.security.payload.response;

import ru.telonsoft.telagame.models.User;

public class JwtResponse {
    private String token;
    private String type = "Bearer";

    private User user;


    public JwtResponse(String accessToken, User user) {
        this.token = accessToken;
        this.user = user;

    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public User getUser() {
        user.setPassword(null);
        return user;
    }


}