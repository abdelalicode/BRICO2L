package com.sneakpeak.bricool.exception;


import com.sneakpeak.bricool.response.ResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(NotFoundException ex) {
        return ResponseHandler.errorBuilder(
                ex.getMessage(),
                HttpStatus.NOT_FOUND
        );
    }

   @ExceptionHandler(NotAuthorizedException.class)
   public ResponseEntity<Object> handleNotEligibleException(NotAuthorizedException ex) {
     return ResponseHandler.errorBuilder(
            ex.getMessage(),
               HttpStatus.FORBIDDEN
      );
  }

    @ExceptionHandler(NoCityException.class)
    public ResponseEntity<Object> handleNoCityException(NoCityException ex) {
        return ResponseHandler.errorBuilder(
                ex.getMessage(),
                HttpStatus.FORBIDDEN
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception ex) {
        String fullMessage = ex.getMessage();
        String extractedMsg = fullMessage.split("\\[insert into")[0].trim();

        int detailIndex = extractedMsg.indexOf("Détail");
        if (detailIndex != -1 && extractedMsg.length() > detailIndex + 17) {
            String msg = extractedMsg.substring(detailIndex + 17, extractedMsg.length() - 1);
            return ResponseHandler.errorBuilder(msg, HttpStatus.FORBIDDEN);
        } else {
            return ResponseHandler.errorBuilder(ex.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

}
