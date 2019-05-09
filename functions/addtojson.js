const fs = require('fs-extra');
const path = require('path');

function slugify(string) {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
    const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with ‘and’
      // Remove all non-word characters 
      .replace(/[^\w\-]+/g, '') // eslint-disable-line no-useless-escape 
      // Replace multiple - with single -
      .replace(/\-\-+/g, '-') // eslint-disable-line no-useless-escape 
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text */
  }

const main = async () => {
    const files = (await fs.readdir('./')).filter(file => path.extname(file) === ".json" && !file.startsWith('package'));

    if(files.length === 0) {
        return console.log('no files found');
    }

    console.log(`Files to open: ${files.join(',')}`);

    const input = await Promise.all(files.map(i => fs.readJSON(i)));

    // Clear
    const output = input.map(legend => {
        return {
            name: legend.name,
            slug: slugify(legend.name),
            abstract: '',
            cards: legend.cards.map(card => {
                delete card.id;
                return card;
            })
        };
    });

    const pathToJson = './../storage/legends.json';
    await fs.writeJSON(pathToJson, [...await fs.readJSON(pathToJson), ...output]);

    console.log(`finish adding ${output.length} legend(s)`);
};

main();