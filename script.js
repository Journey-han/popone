const formData = {};
let currentStep = 0;

const logs = [];

const steps = [
    {
        type: 'input',
        question: '털복숭이 친구(반려견)의 <br> 이름을 알려주세요!',
        label: '반려견 이름',
        name: 'name',
        placeholder: '반려견 이름',
        required: true
    },
    {
        type: 'select',
        question: name => `${name}의 생일은 언제인가요?`,
        label: '생일',
        name: 'birth',
        options: {
            years: Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i),
            months: Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
        }
    },
    {
        type: 'radio',
        question: name => `${name}의 성별은 무엇인가요?`,
        label: '성별',
        name: 'gender',
        options: [
            { value: '남자', label: 'male', image: 'https://journey-han.github.io/popone/src/img/Boy.png' },
            { value: '여자', label: 'female', image: 'https://journey-han.github.io/popone/src/img/Girl.png' }
        ]
    },
    {
        type: 'radio',
        question: name => `${name}는 중성화 되었나요?`,
        label: '중성화 여부',
        name: 'neutered',
        options: [
            { value: '예', label: 'neuteredY', text: 'Yes' },
            { value: '아니요', label: 'neuteredN', text: 'No' }
        ]
    },
    {
        type: 'input',
        question: name => `${name}의 견종은 무엇인가요?`,
        label: '견종',
        name: 'breed',
        placeholder: '반려견 견종',
        required: true
    },
    {
        type: 'input',
        question: name => `${name}의 체중을 알려주세요!`,
        label: '반려견 체중',
        name: 'weight',
        placeholder: '반려견 체중',
        required: true
    },
    {
        type: 'radio',
        question: name => `${name}의 하루 활동량은 어느정도 인가요?`,
        label: '하루 활동량',
        name: 'lifeStyle',
        options: [
            { value: '게으른', label: 'Lazy', image: 'https://journey-han.github.io/popone/src/img/Lazy.png' },
            { value: '활동적인', label: 'Active', image: 'https://journey-han.github.io/popone/src/img/Active.png' },
            { value: '매우 활동적인', label: 'Very Active', image: 'https://journey-han.github.io/popone/src/img/Very_Active.png' }
        ]
    },
    {
        type: 'radio',
        question: name => `${name}의 체형은 어떤가요?`,
        label: '체형',
        name: 'bodyType',
        options: [
            { value: '조금 마른', label: 'A little skinny', image: 'https://journey-han.github.io/popone/src/img/A_little_skinny.png' },
            { value: '적당한', label: 'Just right', image: 'https://journey-han.github.io/popone/src/img/Just_right.png' },
            { value: '과체중', label: 'A little chubby', image: 'https://journey-han.github.io/popone/src/img/A_little_chubby.png' },
            { value: '비만', label: 'Obese', image: 'https://journey-han.github.io/popone/src/img/Obese.png' }
        ]
    },
    {
        type: 'radio',
        question: name => `${name}는 하루에 몇 번 식사를 하나요?`,
        label: '하루 식사 횟수',
        name: 'mealTime',
        options: [
            { value: '하루 1번', label: '하루 1번', text: '하루 1번' },
            { value: '하루 2번', label: '하루 2번', text: '하루 2번' },
            { value: '하루 3번', label: '하루 3번', text: '하루 3번' },
            { value: '그 외', label: '그 외', text: '그 외' }
        ]
    },
    /*
    {
        type: 'checkbox',
        question: name => `${name}가 좋아하는 간식의 식감은?`,
        label: '간식 식감',
        name: 'snackTexture',
        options: [
            { value: '단단한', label: '단단한', text: '단단한' },
            { value: '부드러운', label: '부드러운', text: '부드러운' },
            { value: '바삭한', label: '바삭한', text: '바삭한' },
            { value: '질긴', label: '질긴', text: '질긴' },
        ],
        multiple: true
    },
    */
    {
        type: 'checkbox',
        question: name => `${name}에게 알레르기 또는 <br> 민감한 반응이 나타나는 식재료가 있나요?`,
        label: '알레르기',
        name: 'allergy',
        options: [
            { value: '없어요', label: '없어요', text: '없어요' },
            { value: '잘모르겠어요', label: '잘모르겠어요', text: '잘모르겠어요' },
            { value: '돼지', label: '돼지', text: '돼지' },
            { value: '닭', label: '닭', text: '닭' },
            { value: '오리', label: '오리', text: '오리' },
            { value: '소', label: '소', text: '소' },
            { value: '양', label: '양', text: '양' },
            { value: '말', label: '말', text: '말' },
            { value: '칠면조', label: '칠면조', text: '칠면조' },
            { value: '캥거루', label: '캥거루', text: '캥거루' },
            { value: '연어', label: '연어', text: '연어' },
            { value: '흰살생선', label: '흰살생선', text: '흰살생선' },
            { value: '명태', label: '명태', text: '명태' },
            { value: '기타', label: '기타', text: '기타' }
        ],
        multiple: true
    },
    {
        type: 'radio',
        question: name => `${name}의 전반적인 건강상태를 파악해볼게요! <br> 특별한 건강 문제를 가지고 있나요?`,
        label: '건강상태',
        name: 'healthYn',
        options: [
            { value: '예', label: 'specialY', text: 'Yes' },
            { value: '아니오', label: 'specialN', text: 'No' }
        ]
    },
    {
        type: 'checkbox',
        question: name => `${name}는 어떤 특별한 건강 문제를 가지고 있나요?`,
        label: '건강상태Y',
        name: 'healthY',
        options: [
            { value: '1', label: 'healthY', text: '우리 강아지는 대체로 건강해요.' },
            { value: '2', label: 'healthY', text: '이가 약해서 단단한 간식은 선호하지 않아요.' },
            { value: '3', label: 'healthY', text: '우리 강아지는 설사 또는 구토가 잦아요. ' },
            { value: '4', label: 'healthY', text: '우리 강아지는 관절이 약한 편이에요.' },
            { value: '5', label: 'healthY', text: '우리 강아지는 활동적이라 높은 에너지가 필요해요.' },
            { value: '6', label: 'healthY', text: '우리 강아지는 비만이라 체중 감량이 필요해요.' },
            { value: '7', label: 'healthY', text: '우리 강아지는 너무 말라서 체중 증가가 필요해요.' },
            { value: '8', label: 'healthY', text: '피모가 취약해서 자주 긁거나 털이 빠져요.' },
            { value: '9', label: 'healthY', text: '우리 강아지는 특정 질환을 가지고 있어요. Ex. 심장병, 당뇨, 신장질환, 간질환 등', isInput: true }
        ],
        multiple: true
    }
];

const fectors = {
    adult: {
        neuteredY: 1.6,
        neuteredN: 1.8,
        overweight: 1.4,
        obese: 1.0
    },
    senior: {
        neuteredY: 1.2,
        neuteredN: 1.4
    }
};

// 질문 생성
function renderStep(step) {
    const container = document.getElementById('form-container');
    container.innerHTML = '';

    const question = document.createElement('h3');
    question.innerHTML = typeof step.question === 'function' ? step.question(formData['name']) : step.question;
    question.classList.add('text-center', 'mb-4');
    container.appendChild(question);
    if (step.name === 'allergy') {
        const htag = document.createElement('h6');
        htag.innerHTML = '있다면 포포네에서 사용하는 식재료 중 제외해야 하는 재료를 선택해주세요.'
        htag.classList.add('text-center', 'mb-4');
        container.appendChild(htag);
    }

    const formGroup = document.createElement('div');
    formGroup.classList.add('mb-3');
    //formGroup.style.maxWidth = '400px';


    if (step.type === 'input') {
        if (step.name === 'weight') {
            const inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group');

            const input = document.createElement('input');
            input.type = 'text';
            input.name = step.name;
            input.classList.add('form-control', 'rounded-left');
            input.placeholder = step.placeholder;
            input.required = step.required;

            const inputGroupAppend = document.createElement('span');
            inputGroupAppend.classList.add('input-group-text', 'rounded-right');
            inputGroupAppend.innerText = 'Kg';

            inputGroup.appendChild(input);
            inputGroup.appendChild(inputGroupAppend);

            formGroup.appendChild(inputGroup);
        } else if (step.name === 'breed') {
            // 라디오 버튼 추가
            const radioGroup = document.createElement('div');
            radioGroup.classList.add('d-flex', 'justify-content-around', 'w-100', 'mt-3');

            ['소형견', '중형견', '대형견'].forEach(size => {
                const radioDiv = document.createElement('div');
                radioDiv.classList.add('form-check');

                const radioInput = document.createElement('input');
                radioInput.classList.add('form-check-input');
                radioInput.type = 'radio';
                radioInput.name = 'size';
                radioInput.value = size;
                radioInput.id = size;

                const radioLabel = document.createElement('label');
                radioLabel.classList.add('form-check-label');
                radioLabel.htmlFor = size;
                radioLabel.innerText = size;

                radioDiv.appendChild(radioInput);
                radioDiv.appendChild(radioLabel);
                radioGroup.appendChild(radioDiv);

                radioDiv.addEventListener('click', () => {
                    radioDiv.style.backgroundColor = '';
                    radioInput.checked = !input.checked;
                    radioInput.dispatchEvent(new Event('change'));
                    if (radioInput.checked) {
                        radioDiv.style.backgroundColor = '#eoeoeo'; // 선택됐을 때의 배경색
                    } else {
                        radioDiv.style.backgroundColor = ''; // 선택 해제됐을 때의 배경색을 기본값으로 설정
                    }
                });
            });

            //document.getElementById('form-container').appendChild(radioGroup);

            formGroup.appendChild(radioGroup);

            const input = document.createElement('input');
            input.type = 'text';
            input.name = step.name;
            input.classList.add('form-control', 'nameInput');
            input.placeholder = step.placeholder;
            input.required = step.required;

            formGroup.appendChild(input);

        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = step.name;
            input.classList.add('form-control', 'nameInput');
            input.placeholder = step.placeholder;
            input.required = step.required;

            formGroup.appendChild(input);
        }
    } else if (step.type === 'radio' || step.type === 'checkbox') {
        const optionContainer = document.createElement('div');

        if (step.name === 'bodyType') {
            optionContainer.classList.add('b-radio-images');
        } else {
            optionContainer.classList.add(step.type === 'radio' ? 'radio-images' : 'checkbox-images');
        }



        step.options.forEach(option => {

            const input = document.createElement('input');
            const label = document.createElement('label');
            label.htmlFor = option.value;

            input.type = step.type;
            input.id = option.value;
            input.name = step.name;
            input.value = option.value;

            if (option.image) {
                const img = document.createElement('img');
                img.src = option.image;
                img.alt = option.label;
                label.appendChild(img);
            } else {
                label.innerHTML = `<span>${option.text}</span>`;
            }

            const containerDiv = document.createElement('div');
            if (option.image) {
                if (step.name === 'bodyType') {
                    const label = document.createElement('label');
                    const img = document.createElement('img');
                    containerDiv.classList.add('b-has-img');
                } else {
                    containerDiv.classList.add('has-img');
                }
            } else if (option.isInput) {
                input.type = 'checkbox';
                input.id = option.value;
                input.name = step.name;
                input.value = option.value;

                const inputText = document.createElement('input');
                inputText.type = 'text';
                inputText.name = `${step.name}_other`;
                inputText.placeholder = '기타 내용을 입력해주세요!';
                inputText.classList.add('form-control');

                label.appendChild(input);
                label.appendChild(inputText);

                containerDiv.classList.add('checkbox-container-no-flex');

                containerDiv.addEventListener('click', () => {
                    containerDiv.style.backgroundColor = '';
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change'));
                    if (inputText.checked) {
                        containerDiv.style.backgroundColor = '#eoeoeo'; // 선택됐을 때의 배경색
                    } else {
                        containerDiv.style.backgroundColor = ''; // 선택 해제됐을 때의 배경색을 기본값으로 설정
                    }
                });
                inputText.addEventListener('input', () => {
                    if (input.checked) {
                        input.value = inputText.value;
                    }
                });
            } else {
                containerDiv.classList.add(step.type === 'radio' ? 'radio-container' : 'checkbox-container');
                containerDiv.addEventListener('click', () => {
                    containerDiv.style.backgroundColor = '';
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change'));
                    if (input.checked) {
                        containerDiv.style.backgroundColor = '#eoeoeo'; // 선택됐을 때의 배경색
                    } else {
                        containerDiv.style.backgroundColor = ''; // 선택 해제됐을 때의 배경색을 기본값으로 설정
                    }
                });

            }
            containerDiv.appendChild(input);
            containerDiv.appendChild(label);

            optionContainer.appendChild(containerDiv);
        });

        container.appendChild(optionContainer);
        return;
    } else if (step.type === 'select') {
        if (step.name === 'birth') {
            const selectGroupContainer = document.createElement('div');
            selectGroupContainer.classList.add('d-flex', 'gap-2');

            ['years', 'months'].forEach((unit, index) => {
                const selectGroup = document.createElement('div');
                selectGroup.classList.add('flex-fill');

                const select = document.createElement('select');
                select.classList.add('form-select');
                select.name = `${step.name}${index + 1}`;
                select.required = true;

                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.innerText = unit === 'years' ? '생년' : '월';
                select.appendChild(defaultOption);

                step.options[unit].forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.text = option;
                    select.appendChild(optionElement);
                });

                selectGroup.appendChild(select);
                selectGroupContainer.appendChild(selectGroup);
            });

            formGroup.appendChild(selectGroupContainer);
        }
    }

    container.appendChild(formGroup);

}


// form data
function getFormData(step) {
    const inputs = document.querySelectorAll(`[name^="${step.name}"]`); // "^"를 사용하여 이름이 step.name으로 시작하는 모든 요소를 선택합니다.
    if (step.type === 'select' && step.name === 'birth') {
        formData[step.name] = Array.from(inputs).map(input => input.value).join('-');
    } else if (step.type === 'checkbox') {
        formData[step.name] = Array.from(inputs)
            .filter(input => input.checked)
            .map(input => input.value);
    } else if (step.type === 'radio') {
        const checkedInput = Array.from(inputs).find(input => input.checked);
        formData[step.name] = checkedInput ? checkedInput.value : null;
    } else {
        formData[step.name] = Array.from(inputs).map(input => input.value);
    }

    // 콘솔에 선택된 사이즈 출력
    const sizeInput = document.querySelector('input[name="size"]:checked');
    if (sizeInput) {
        console.log(`사이즈: ${sizeInput.value}`);
    }

    return formData[step.name];
}

// 뒤로가기
document.getElementById('prev-button').addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep(steps[currentStep]);
        updateProgressBarM();
    }
});

// 계속하기
document.getElementById('next-button').addEventListener('click', () => {
    updateProgressBar();

    // 유효성 검사 함수
    const validChk = () => {
        const nameField = document.getElementsByName('name');
        if (nameField.length > 0) {
            if (nameField[0].value === "") {
                alert("잘못된 이름 형식입니다. 한글로 정확히 입력해주세요.");
                nameField[0].focus();
                return false;
            }
        }

        const birthMField = document.getElementsByName('birth1');
        const birthDField = document.getElementsByName('birth2');
        if (birthMField.length > 0 && birthDField.length > 0) {
            const birthYear = document.getElementsByName('birth1')[0];
            const birthMonth = document.getElementsByName('birth2')[0];

            if (!birthYear.value || !birthMonth.value) {
                alert("잘못된 날짜 형식입니다.");
                birthYear.focus();
                return false;
            }
        }

        const genderField = document.getElementsByName('gender');
        if (genderField.length > 0) {
            const selectedGender = Array.from(genderField).some(option => option.checked);
            if (!selectedGender) {
                alert("성별을 선택해주세요!")
                return false;
            }
        }

        const neuteredField = document.getElementsByName('neutered');
        if (neuteredField.length > 0) {
            const selectedNeutered = Array.from(neuteredField).some(option => option.checked);
            if (!selectedNeutered) {
                alert("중성화 여부를 선택해주세요!")
                return false;
            }
        }

        const breedField = document.getElementsByName('breed');
        if (breedField.length > 0) {
            const selectedBreed = document.getElementsByName('breed')[0];
            if (selectedBreed.value === '') {
                alert("견종을 입력해주세요!");
                selectedBreed.focus();
                return false;
            }
        }

        const weightField = document.getElementsByName('weight');
        if (weightField.length > 0) {
            const selectedWeight = document.getElementsByName('weight')[0];
            if (selectedWeight.value === '') {
                alert("체중을 입력해주세요!");
                selectedWeight.focus();
                return false;
            } else if (isNaN(selectedWeight.value)) {
                alert("체중은 숫자로 입력해주세요!");
                selectedWeight.focus();
                return false;
            }
        }

        const lifeStyleField = document.getElementsByName('lifeStyle');
        if (lifeStyleField.length > 0) {
            const selectedLifStyle = Array.from(lifeStyleField).some(option => option.checked);
            if (!selectedLifStyle) {
                alert("활동량을 선택해주세요!")
                return false;
            }
        }

        const bodyTypeField = document.getElementsByName('bodyType');
        if (bodyTypeField.length > 0) {
            const selectedBodyType = Array.from(bodyTypeField).some(option => option.checked);
            if (!selectedBodyType) {
                alert("체형을 선택해주세요!")
                return false;
            }
        }

        const mealTimeField = document.getElementsByName('mealTime');
        if (mealTimeField.length > 0) {
            const selectedMealTime = Array.from(mealTimeField).some(option => option.checked);
            if (!selectedMealTime) {
                alert("식사량을 선택해주세요!")
                return false;
            }
        }

        const snackTextureField = document.getElementsByName('snackTexture');
        if (snackTextureField.length > 0) {
            const selectedSnack = Array.from(snackTextureField).some(option => option.checked);
            if (!selectedSnack) {
                alert("간식 식감을 선택해주세요!")
                return false;
            }
        }

        const allergyField = document.getElementsByName('allergy');
        if (allergyField.length > 0) {
            const sltdAllergy = Array.from(allergyField).some(option => option.checked);
            if (!sltdAllergy) {
                alert("알러지 식재료를 선택해주세요!")
                return false;
            }
        }

        /*
        const ingredientField = document.getElementsByName('ingredient');
        if (ingredientField.length > 0) {
            const sltdIngredient = Array.from(ingredientField).some(option => option.checked);
            if (!sltdIngredient) {
                alert("알러지 식재료를 선택해주세요!")
                return false;
            }
        }
        */

        return true;
    };

    if (!validChk()) {
        return;
    }

    const healthOptions = document.getElementsByName('healthYn');
    let selectedHealth = null;
    if (healthOptions.length > 0) {
        selectedHealth = Array.from(healthOptions).find(option => option.checked);
    }

    if (selectedHealth && selectedHealth.value === '아니오') {
        alert('모든 입력이 완료되었습니다.');
        renderResults();
        renderRecommend();
    }

    // 데이터 컨솔에 보여주기
    const currentStepData = getFormData(steps[currentStep]);
    console.log(`${steps[currentStep].label}: ${currentStepData}`);

    logData(steps[currentStep].name, currentStepData);

    // 질문 더 보여줄건지 결과 보여줄건지
    if (currentStepData) {
        formData[steps[currentStep].name] = currentStepData;
        currentStep++;
        if (currentStep < steps.length) {
            renderStep(steps[currentStep]);
        } else {
            renderResults();
            renderRecommend();
            saveLog();
        }

        const nextButton = document.getElementById('next-button');
        if (currentStep === steps.length - 1) {
            nextButton.innerText = '결과 보기';
        } else {
            nextButton.innerText = '계속하기';
        }
    } else {
        alert('모든 필드를 입력해주세요.');
    }

});

// 칼로리 계산
function calculate(weight, age, neutered, condition) {
    let exponent1;
    let exponent2;
    let minResult;
    let maxResult;

    if (age >= 7) {
        exponent1 = fectors.senior[neutered ? 'neuteredY' : 'neuteredN'];
        return ((weight * 30) + 70) * exponent1;
    } else {
        if (neutered === 'neuterdY') {
            exponent1 = fectors.adult.neuteredY;
            if (condition === 'overweight') {
                exponent2 = fectors.adult.overweight;
                Math.round(minResult) = ((weight * 30) + 70) * exponent2;
                Math.round(maxResult) = ((weight * 30) + 70) * exponent1;
                return minResult + ' ~ ' + Math.round(maxResult);
            } else if (condition === 'obese') {
                exponent2 = fectors.adult.obese;
                Math.round(minResult) = ((weight * 30) + 70) * exponent2;
                Math.round(maxResult) = ((weight * 30) + 70) * exponent1;
                return Math.round(minResult) + ' ~ ' + Math.round(maxResult);
            } else {
                return ((weight * 30) + 70) * exponent1;
            }
        } else {
            exponent1 = fectors.adult.neuteredN;
            if (condition === 'overweight') {
                exponent2 = fectors.adult.overweight;
                Math.round(minResult) = ((weight * 30) + 70) * exponent2;
                maxResult = ((weight * 30) + 70) * exponent1;
                return Math.round(minResult) + ' ~ ' + Math.round(maxResult);
            } else if (condition === 'obese') {
                exponent2 = fectors.adult.obese;
                Math.round(minResult) = ((weight * 30) + 70) * exponent2;
                Math.round(maxResult) = ((weight * 30) + 70) * exponent1;
                return Math.round(minResult) + ' ~ ' + Math.round(maxResult);
            } else {
                return ((weight * 30) + 70) * exponent1;
            }
        }
    }
}

// 생일 계산
function calculateAge(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

function renderResults() {
    const mainSection = document.getElementById('main');
    mainSection.style.display = 'none';
    const resultSection = document.getElementById('result');
    resultSection.innerHTML = ''; // 기존 내용을 지웁니다.
    resultSection.classList.remove('d-none');
    const recommendSection = document.getElementById('recommend');
    recommendSection.classList.remove('d-none');

    const resultTitle = document.createElement('h2');
    resultTitle.innerText = '결과 보기';
    resultSection.appendChild(resultTitle);

    /*
    Object.keys(formData).forEach(key => {
        const value = formData[key];

        const resultItem = document.createElement('p');
        resultItem.innerHTML = `<strong>${key}</strong>: ${Array.isArray(value) ? value.join(', ') : value}`;
        resultSection.appendChild(resultItem);
    });
    */

    let petName = '';
    let reImages = [];
    Object.keys(formData).forEach(key => {
        const value = formData[key];

        if (key === 'name') {
            petName = value;  // 이름을 저장
        }

        const images = [
            { src: 'https://journey-han.github.io/popone/src/img/result1.png', alt: 'PorkDance' },
            { src: 'https://journey-han.github.io/popone/src/img/result2.png', alt: 'StrongHeartBeef' },
            { src: 'https://journey-han.github.io/popone/src/img/result3.png', alt: 'ColorfulChickenBowl' },
            { src: 'https://journey-han.github.io/popone/src/img/result4.png', alt: 'Light&TastyDuck' },
            { src: 'https://journey-han.github.io/popone/src/img/result5.png', alt: 'LambFlower' },
            { src: 'https://journey-han.github.io/popone/src/img/result6.png', alt: 'HeroHorseProtein' },
            { src: 'https://journey-han.github.io/popone/src/img/result7.png', alt: 'JointBoostFish' }
        ];

        if (key === 'allergy') {
            // 조건에 따라 추가할 이미지 배열
            const additionalImages = value.flatMap(value => {
                if (value === '돼지') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result1.png', alt: 'PorkDance' };
                } else if (value === '소') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result2.png', alt: 'StrongHeartBeef' };
                } else if (value === '닭' || value === '칠면조') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result3.png', alt: 'ColorfulChickenBowl' };
                } else if (value === '오리') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result4.png', alt: 'Light&TastyDuck' };
                } else if (value === '양') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result5.png', alt: 'LambFlower' };
                } else if (value === '말') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result6.png', alt: 'HeroHorseProtein' };
                } else if (value === '흰살생선' || value === '연어') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result7.png', alt: 'JointBoostFish' };
                } else {
                    return [];
                }
            });

            reImages = images.filter(image =>
                !additionalImages.some(addImage => addImage.src === image.src && addImage.alt === image.alt)
            );

            const altTexts = reImages.map(image => image.alt);
            logData('Recommend Meal', altTexts.join(', '));

            // 슬라이드 HTML 생성
            let slidesHTML = reImages.map(image => `
        <div class="swiper-slide">
            <div class="re_img">
                <img src="${image.src}" alt="${image.alt}">
            </div>
        </div>
    `).join('');
            // 전체 슬라이더 HTML 반환 및 추가x
            let sliderHTML = `
            <h3>${petName}의 맞춤식을 추천해드릴게요!</h3>
            <div class="model_swiper">
                <div class="model">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            ${slidesHTML}
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        `;
            resultSection.innerHTML += sliderHTML;
        }
    });

    // Swiper 스타일 삽입
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://journey-han.github.io/popone/src/css/swiper.css';
    document.head.appendChild(link);

    // Swiper 초기화 스크립트 삽입
    const script = document.createElement('script');
    script.src = "https://journey-han.github.io/popone/src/js/swiper.min.js";
    document.body.appendChild(script);
    script.onload = () => {
        const swiperOptions = {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        };

        // 이미지가 두 개 이상일 때만 navigation 추가
        if (reImages.length > 1) {
            swiperOptions.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            };
        }

        var swiper = new Swiper('.swiper-container', swiperOptions);


        // 다운로드 버튼 표시
        document.getElementById('download-log-button').classList.remove('d-none');
    };
}

// 추천 보기 노출
function renderRecommend() {
    const mainSection = document.getElementById('main');
    mainSection.style.display = 'none';
    const resultSection = document.getElementById('result');
    resultSection.classList.remove('d-none');
    const recommendSection = document.getElementById('recommend');
    recommendSection.innerHTML = '';
    recommendSection.classList.remove('d-none');
    document.getElementById('download-log-button').classList.remove('d-none');

    const resultTitle = document.createElement('h2');
    resultTitle.innerText = '추천 보기';
    recommendSection.appendChild(resultTitle);

    const weight = parseFloat(formData['weight']);
    const birthdate = `${formData['birth']}-01`;
    const age = calculateAge(birthdate);
    const neutered = formData['neutered'] === '예' ? 'neuteredY' : 'neuteredN';

    let condition = '';
    if (formData['bodyType'] === '과체중') {
        condition = 'overweight';
    } else if (formData['bodyType'] === '비만') {
        condition = 'obese';
    }

    const calculationResult = calculate(weight, age, neutered, condition);

    const calculateItem = document.createElement('p');
    calculateItem.innerHTML = `<strong>일일 섭취 칼로리</strong>: ${calculationResult}Kcal`;
    console.log('Kcal: ', calculationResult)
    recommendSection.appendChild(calculateItem);

    logData('calculationResult', calculationResult+'Kcal');

    document.getElementById('download-log-button').classList.remove('d-none');

}


// 진행바
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentStep + 2) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function updateProgressBarM() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

// 로그 수집 함수
function logData(stepName, value) {
    const timestamp = new Date();
    const formattedTimestamp = formatDate(timestamp);
    logs.push({ timestamp: formattedTimestamp, stepName, value });
}

function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error("Invalid Date object", date);
        throw new Error("Invalid Date object");
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


// CSV 변환 함수
function convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}\r\n`;

    return array.reduce((str, next) => {
        str += `${Object.values(next).map(value => `"${value}"`).join(",")}\r\n`;
        return str;
    }, str);
}

// 파일 다운로드 함수
function downloadCSV(filename, csvContent) {
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 로그 저장 함수
function saveLog() {
    const csvContent = convertToCSV(logs);
    downloadCSV('log.csv', csvContent);
}

document.getElementById('download-log-button').addEventListener('click', saveLog);

window.onload = () => {
    renderStep(steps[currentStep]);
};