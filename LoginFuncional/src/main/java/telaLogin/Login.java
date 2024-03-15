package telaLogin;

import java.util.Scanner;

public class Login {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        LoginMetodos usar = new LoginMetodos();
        Boolean validacao;

        do{
            System.out.println("Digite de email:\n");
            String email = input.next();
            validacao = usar.validarEmail(email);

        } while (validacao == false);


        do {
            System.out.println("Digite sua senha:\n");
            String senha = input.next();
            validacao = usar.validarSenha(senha);

        } while (validacao == false);

        if(validacao == true){
            System.out.println("\nVocê está logado!");
        }

    }
}
