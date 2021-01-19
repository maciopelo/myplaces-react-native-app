import csv
import pathlib

PATH = str(pathlib.Path(__file__).parent.absolute())


def appendVoivodeshipData(name, f):
    voivodeship = name.split('/')[len(name.split('/'))-1].split('.')[0]
    with open(name) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        id = 0
        data = list(csv_reader)
        row_count = len(data)//100
        csv_file.seek(0)

        for row in csv_reader:
            if line_count == 0:
                f.write("{ name:'"+voivodeship+"', borderCoords: [")
            else:
                if line_count % row_count == 0:
                    f.write('{ id:'+str(id)+', longitude:' +
                            row[2]+',latitude:'+row[1]+'},')
                    id += 1
            line_count += 1
        f.write("],},")


f = open(PATH+'/output.js', "w+")
f.write("const data = [")

appendVoivodeshipData("/home/maciej/R/r-scripts/dolnoslaskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/kujawsko-pomorskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/lodzkie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/lubelskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/lubuskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/malopolskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/mazowieckie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/opolskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/podkarpackie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/podlaskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/pomorskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/slaskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/swietokrzyskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/warminsko-mazurskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/wielkopolskie.csv", f)
appendVoivodeshipData("/home/maciej/R/r-scripts/zachodniopomorskie.csv", f)

f.write("]; \n export default data;")
