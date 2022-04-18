class Person {
	constructor() {
		this.gender = null
		this.firstName = null
		this.surname = null
		this.patronym = null
		this.profession = null
		this.date = null

		this.createPerson()
	}

	createPerson() {
		const randomizer = new Randomizer

		this.gender = randomizer.randomGender()
		this.firstName = randomizer.randomFirstName(this.gender)
		this.surname = randomizer.randomSurname(this.gender)
		this.patronym = randomizer.randomPatronym(this.gender)
		this.profession = randomizer.randomProfession(this.gender)
		this.date = randomizer.randomDate()
	}
}

class Randomizer {
	/** Случайный гендер */
	randomGender() {
		return this.randomInt() == 1 ? 'Женщина' : 'Мужчина'
	}

	/** Случайное имя */
	randomFirstName(gender) {
		return (gender == 'Женщина' ? this.parseRandomValue(data.firstNameFemaleJson) : this.parseRandomValue(data.firstNameMaleJson))
	}

	/** Случайное отчество на основе мужских имен */
	randomPatronym(gender) {
		let fatherName = this.randomFirstName()

		let letter = '' // буква, соединяющая основу с окончанием
		if (fatherName.slice(-1) === 'й') {
			letter = 'е'
			fatherName = fatherName.slice(0,-1)
		} else {
			letter = 'о'
		}

		let ending = gender == 'Женщина' ? 'вна' : 'вич' // присоединение окончания

		return fatherName + letter + ending
	}

	randomSurname(gender) {
		let baseSurname = this.parseRandomValue(data.surnameJson)
		return gender == 'Женщина' ? baseSurname + 'а' : baseSurname
	}

	randomProfession(gender) {
		let professionType = this.parseRandomValue(data.professionJson)
		return (gender == 'Женщина' ? professionType[1] : professionType[0])
	}

	randomDate() {
		const startDate = 1000000000000,
			endDate = -1000000000000
		let date = new Date( +startDate + Math.random() * (endDate - startDate))
		let options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
		}
		
		return date.toLocaleString("ru", options)
	}

	randomInt(max = 1, min = 0) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	parseRandomValue(json) {
		const obj = JSON.parse(json)
		const prop = `id_${this.randomInt(obj.count, 1)}`
		return obj.list[prop]
	}
}

class Interface {
	constructor() {
		this.fields = {}
	}

	init() {
		this.fields = {
			gender: document.querySelector('#genderOutput'),
			firstName: document.querySelector('#firstNameOutput'),
			surname: document.querySelector('#surnameOutput'),		
			patronym: document.querySelector('#patronymOutput'),
			profession: document.querySelector('#professionOutput'),
			date: document.querySelector('#birthYearOutput')
		}

		document.querySelector('#button-generate').addEventListener('click', () => this.fillPersonData())
		document.querySelector('#button-clear').addEventListener('click', () => this.clearData())
	}

	fillData(params) {
		for (let key in this.fields) {
			if (this.fields[key]) {
				this.fields[key].textContent = params[key]
			}
		}
	}

	fillPersonData() {
		const person = new Person()
	
		this.fillData(person)
	}

	clearData() {
		const params = {
			gender: 'Пол',
			firstName: 'Имя',
			surname: 'Фамилия',
			patronym: 'Отчество',
			profession: 'Профессия',
			date: 'Дата рождения'
		}
	
		this.fillData(params);
	}
}

window.onload = function() {
	const UI = new Interface()
	UI.init()
}
