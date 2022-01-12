
# read file rijecisvrstom.txt line by line


file1 = open('rijecisvrstom.txt', 'r')
lines = file1.readlines()


def getWordLen(word: str):
    startingLen = len(word)
    startingLen -= word.count("lj")
    startingLen -= word.count("nj")

    return startingLen


for line in lines:
    word = line.split(" ")
    try:
        if ((word[2] == "imenica") and getWordLen(word[0]) == 5):
            print("'{}',".format(word[0]))
    except IndexError:
        pass
