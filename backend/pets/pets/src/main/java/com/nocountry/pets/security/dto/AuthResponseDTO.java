package com.nocountry.pets.security.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "username", "message", "token","status" })

public record AuthResponseDTO (Long id, String username, String message, String token, boolean status){
}
