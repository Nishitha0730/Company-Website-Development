//package com.company.website.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.*;
//
//import java.nio.file.Paths;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addResourceHandlers(@org.jetbrains.annotations.NotNull ResourceHandlerRegistry registry) {
//        String uploadPath = Paths.get("uploads").toAbsolutePath().toUri().toString();
//        registry.addResourceHandler("/uploads/**")
//                .addResourceLocations(Paths.get("uploads").toAbsolutePath().toUri().toString() + "/");
//    }
//}
//
//

package com.company.website.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Get the absolute path to the 'uploads' directory
        String uploadDir = Paths.get("uploads").toAbsolutePath().toString();

        // Register the resource handler
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDir + "/");
    }
}