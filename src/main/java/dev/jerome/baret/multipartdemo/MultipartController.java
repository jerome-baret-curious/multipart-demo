package dev.jerome.baret.multipartdemo;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("multi")
public class MultipartController {

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(value = "", produces = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MultiValueMap<String, Object> sendMulti() {
        MultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();

        parts.add("partOne", "a string");

        HttpHeaders headersPartTwo = new HttpHeaders();
        headersPartTwo.setContentType(MediaType.APPLICATION_JSON); // not required
        parts.add("partTwo", new HttpEntity<>(new SimpleDto("mee"), headersPartTwo));

        parts.add("partThree", new ClassPathResource("static/A.pdf"));
        parts.add("partFour", new ClassPathResource("static/B.pdf"));
        return parts;
    }
}
