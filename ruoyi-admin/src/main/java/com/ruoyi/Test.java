package com.ruoyi;

public class Test {
    public static void main(String[] args) {
        String a = "123135adfjwekfjiknvJAIDJV";


        String[] b = a.split("");
        for (int i = 0; i < b.length; i++) {
            System.out.println(b[i]+"-------------");
            System.out.println(b[i]+"hahahhah");
            System.out.println(b[i]+"-------------");
        }
        for (String s : b) {
            System.out.println(s);
        }
    }
}
