package com.saulius.restaurant.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MenuDto {

    @Schema(example = "menu")
    @NotBlank
    private String menuTitle;
}
