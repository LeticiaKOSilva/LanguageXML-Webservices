from lxml import etree

# Calcula a porcentagem de livros emprestados
def questionA(root):
    book_count = 0
    number_of_borrowed_books = 0

    for book in root.find('livros'):
        book_count += int(book.attrib['quantidade'])
        number_of_borrowed_books += int(book.attrib['emprestados'])
    return number_of_borrowed_books *100 / book_count

#Verifica o número de livros do autor Deitele exixtem nessa biblioteca.
def questionB(root):
    name_author = "Deitel" #Nome do autor que deseja-se pesquisar
    books = 0

    for author in root.find('livros'):
        if(author.find('autor').text == name_author):
            books +=1
    return books

#Verifica o qual livro possui o menor número de páginas
def questionC(root):
    number_Pages = 1000; #Valor escolhido por um acaso
    name_book = None

    for book in root.find('livros'):
        if(int(book.find('paginas').text) < number_Pages):
            number_Pages = int(book.find('paginas').text)
            name_book = book.find('titulo').text
    return name_book

#Procura o nome do livro que possui mais de um autor
def questionD(root):
    name_book = []

    for book in root.find('livros'):
        #findall é um elemento usado no xml pois pega todos os elementos de tal tipo, nesse casa ele está pegando todos os autores do correspondente
        numbers_book = book.findall('autor')

        if len(numbers_book) > 1:
            name_book.append(book.find('titulo').text)

    return name_book

'''
    Método que chama todos os outros métodos que ajudaram a obter o resultados dessas questões abaixo:

    a) Qual a porcentagem de livros da biblioteca que estão emprestados.
    b) Quantos títulos diferentes do autor "Deitel" a biblioteca possui?
    c) Qual o nome do livro da biblioteca que possui menos páginas?
    d) Qual o nome do livro (ou livros) que possui mais de um autor?
'''
def controler():
    xml = etree.parse('biblioteca.xml')
    print(xml)

    #Obtendo a raiz
    root = xml.getroot()

    returnA = questionA(root)
    returnB = questionB(root)
    returnC = questionC(root)
    returnD = questionD(root)
   
    print_results(returnA,returnB,returnC,returnD)

#Método que printa as respostas
def print_results(returnA,returnB,returnC,returnD):
    print("Qual a porcentagem de livros da biblioteca que estão emprestados = " + str(returnA) + "\n"
    "Quantos títulos diferentes do autor (Deitel) a biblioteca possui = " + str(returnB) + 
    "\nO nome do livro da biblioteca que possui menos páginas é = " + str(returnC) +
    "\nO nome do livro (ou livros) que possui mais de um autor é = " + str(returnD))

#Responsável por "inicializar"/chamar um método inicial
if __name__ == '__main__':
    controler()
