// 전역 변수 선언
let formData = {};
let currentStep = 0;
let newCurrentValue;
let newTickValues = [];

// 질문 스텝 정의
let steps = [
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

// 계산에 사용될 계수 데이터
let fectors = {
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

// 동적으로 Tick 값을 생성하는 함수
function generateTickValues(newCurrentValue) {
    let currentValue = '';
    if (newCurrentValue.includes('~')) {
        let temp = newCurrentValue.split('~');
        currentValue = temp[1].trim();
    } else {
        currentValue = newCurrentValue;
    }
    let step = 10;
    let rangeSize = 100;
    let minTickValue = Math.floor(currentValue / rangeSize) * rangeSize;
    let maxTickValue = minTickValue + rangeSize;

    let tickValues = [];
    for (let i = minTickValue; i <= maxTickValue; i += step) {
        tickValues.push(i);
    }

    newTickValues = tickValues; // 전역 변수 업데이트
    return newTickValues;
}

// 슬라이더 값 업데이트 함수
function updateSliderValues(newCurrentValue, newTickValues) {
    let currentValue = '';
    if (newCurrentValue.includes('~')) {
        let temp = newCurrentValue.split('~');
        currentValue = temp[1].trim();
    } else {
        currentValue = newCurrentValue;
    }
    let currentElement = document.getElementById('current-value');
    let percentage = (currentValue - newTickValues[0]) / (newTickValues[newTickValues.length - 1] - newTickValues[0]) * 100;
    console.log('percentage:',percentage)
    console.log('currentValue:',currentValue)
    console.log('tickValues[0]:',newTickValues[0])
    console.log('tickValues[tickValues.length - 1]:',newTickValues[newTickValues.length - 1])
    currentElement.style.left = percentage + '%';
    currentElement.style.left = `calc(${percentage}% - 10px)`;

    let tickLabels = ['label-0', 'label-1', 'label-2', 'label-3', 'label-4', 'label-5', 'label-6', 'label-7', 'label-8', 'label-9', 'label-10'];
    tickLabels.forEach((labelId, index) => {
        let labelElement = document.getElementById(labelId);
        if (labelElement) {
            labelElement.textContent = newTickValues[index];
        }
    });
}


// form data 가져오기 함수
function getFormData(step) {
    let inputs = document.querySelectorAll(`[name^="${step.name}"]`);

    if (step.type === 'select' && step.name === 'birth') {
        formData[step.name] = Array.from(inputs).map(input => input.value).join('-');
    } else if (step.type === 'checkbox') {
        formData[step.name] = Array.from(inputs).filter(input => input.checked).map(input => input.value);
    } else if (step.type === 'radio') {
        let checkedInput = Array.from(inputs).find(input => input.checked);
        formData[step.name] = checkedInput ? checkedInput.value : null;
    } else {
        formData[step.name] = Array.from(inputs).map(input => input.value);
    }

    return formData[step.name];
}

// 질문 생성 함수
function renderStep(step) {
    let container = document.getElementById('form-container');
    container.innerHTML = '';

    let question = document.createElement('h3');
    question.innerHTML = typeof step.question === 'function' ? step.question(formData['name']) : step.question;
    question.classList.add('text-center', 'mb-4');
    container.appendChild(question);

    if (step.name === 'allergy') {
        let htag = document.createElement('h6');
        htag.innerHTML = '있다면 포포네에서 사용하는 식재료 중 제외해야 하는 재료를 선택해주세요.';
        htag.classList.add('text-center', 'mb-4');
        container.appendChild(htag);
    }

    let formGroup = document.createElement('div');
    formGroup.classList.add('mb-3');

    // 각 스텝에 대한 폼 생성 처리
    if (step.type === 'input') {
        if (step.name === 'weight') {
            let inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group');

            let input = document.createElement('input');
            input.type = 'text';
            input.name = step.name;
            input.classList.add('form-control', 'rounded-left');
            input.placeholder = step.placeholder;
            input.required = step.required;

            let inputGroupAppend = document.createElement('span');
            inputGroupAppend.classList.add('input-group-text', 'rounded-right');
            inputGroupAppend.innerText = 'Kg';

            inputGroup.appendChild(input);
            inputGroup.appendChild(inputGroupAppend);

            formGroup.appendChild(inputGroup);
        } else if (step.name === 'breed') {
            // 라디오 버튼 추가
            let radioGroup = document.createElement('div');
            radioGroup.classList.add('d-flex', 'justify-content-around', 'w-100', 'mt-3');

            ['소형견', '중형견', '대형견'].forEach(size => {
                let radioDiv = document.createElement('div');
                radioDiv.classList.add('form-check');

                let radioInput = document.createElement('input');
                radioInput.classList.add('form-check-input');
                radioInput.type = 'radio';
                radioInput.name = 'size';
                radioInput.value = size;
                radioInput.id = size;

                let radioLabel = document.createElement('label');
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

            document.getElementById('form-container').appendChild(radioGroup);

            formGroup.appendChild(radioGroup);

            let input = document.createElement('input');
            input.type = 'text';
            input.name = step.name;
            input.classList.add('form-control', 'nameInput');
            input.placeholder = step.placeholder;
            input.required = step.required;

            formGroup.appendChild(input);

        } else {
            let input = document.createElement('input');
            input.type = 'text';
            input.name = step.name;
            input.classList.add('form-control', 'nameInput');
            input.placeholder = step.placeholder;
            input.required = step.required;

            formGroup.appendChild(input);
        }
    } else if (step.type === 'radio' || step.type === 'checkbox') {
        let optionContainer = document.createElement('div');

        if (step.name === 'bodyType') {
            optionContainer.classList.add('b-radio-images');
        } else {
            optionContainer.classList.add(step.type === 'radio' ? 'radio-images' : 'checkbox-images');
        }



        step.options.forEach(option => {

            let input = document.createElement('input');
            let label = document.createElement('label');
            label.htmlFor = option.value;

            input.type = step.type;
            input.id = option.value;
            input.name = step.name;
            input.value = option.value;

            if (option.image) {
                let img = document.createElement('img');
                img.src = option.image;
                img.alt = option.label;
                label.appendChild(img);
            } else {
                label.innerHTML = `<span>${option.text}</span>`;
            }

            let containerDiv = document.createElement('div');
            if (option.image) {
                if (step.name === 'bodyType') {
                    let label = document.createElement('label');
                    let img = document.createElement('img');
                    containerDiv.classList.add('b-has-img');
                } else {
                    containerDiv.classList.add('has-img');
                }
            } else if (option.isInput) {
                input.type = 'checkbox';
                input.id = option.value;
                input.name = step.name;
                input.value = option.value;

                let inputText = document.createElement('input');
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
            let selectGroupContainer = document.createElement('div');
            selectGroupContainer.classList.add('d-flex', 'gap-2');

            ['years', 'months'].forEach((unit, index) => {
                let selectGroup = document.createElement('div');
                selectGroup.classList.add('flex-fill');

                let select = document.createElement('select');
                select.classList.add('form-select');
                select.name = `${step.name}${index + 1}`;
                select.required = true;

                let defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.innerText = unit === 'years' ? '생년' : '월';
                select.appendChild(defaultOption);

                step.options[unit].forEach(option => {
                    let optionElement = document.createElement('option');
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

// 뒤로 가기 버튼 클릭 이벤트 처리
document.getElementById('prev-button').addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep(steps[currentStep]);
        updateProgressBarM();
    }
});

// 계속하기 버튼 클릭 이벤트 처리
document.getElementById('next-button').addEventListener('click', () => {
    updateProgressBar();

    if (!validChk()) return;  // 유효성 검사 실패시 리턴

    let currentStepData = getFormData(steps[currentStep]);
    if (currentStepData) {
        formData[steps[currentStep].name] = currentStepData;

        // healthYn 체크: 건강상태 확인
        if (steps[currentStep].name === 'healthYn') {
            let healthOptions = document.getElementsByName('healthYn');
            let selectedHealth = Array.from(healthOptions).find(option => option.checked);

            if (selectedHealth && selectedHealth.value === '아니오') {
                alert('모든 입력이 완료되었습니다.');
                renderResults();  // 건강 상태가 "아니오"이면 결과 렌더링
                return;
            }
        }

        currentStep++;
        if (currentStep < steps.length) {
            renderStep(steps[currentStep]);
        } else {
            renderResults();
        }
        document.getElementById('next-button').innerText = currentStep === steps.length - 1 ? '결과 보기' : '계속하기';
    } else {
        alert('모든 필드를 입력해주세요.');
    }
});

// 결과 렌더링 함수
function renderResults() {
    let mainSection = document.getElementById('main');
    mainSection.style.display = 'none';
    let resultSection = document.getElementById('result');
    resultSection.innerHTML = '';
    resultSection.classList.remove('d-none');

    let petName = '';
    let reImages = [];
    Object.keys(formData).forEach(key => {
        let weight = parseFloat(formData['weight']);
        let birthdate = `${formData['birth']}-01`;
        let age = calculateAge(birthdate);
        let neutered = formData['neutered'] === '예' ? 'neuteredY' : 'neuteredN';

        let condition = '';
        if (formData['bodyType'] === '과체중') {
            condition = 'overweight';
        } else if (formData['bodyType'] === '비만') {
            condition = 'obese';
        }

        let calculationResult = calculate(weight, age, neutered, condition);

        if (typeof result === 'string' && calculationResult.includes('~')) {
            let temp = calculationResult.split('~');
            newCurrentValue = temp[1].trim();
        } else {
            newCurrentValue = calculationResult;
        }

        generateTickValues(newCurrentValue);

        let value = formData[key];
        if (key === 'name') {
            petName = value;  // 이름 저장
        }

        // 이미지 필터링 처리 및 슬라이드 생성
        let images = [
            { src: 'https://journey-han.github.io/popone/src/img/result_pork.png', alt: 'result_pork', url: 'https://popone.kr/729973229/?idx=48' },
            { src: 'https://journey-han.github.io/popone/src/img/result_beef.png', alt: 'result_beef', url: 'https://popone.kr/729973229/?idx=49' },
            { src: 'https://journey-han.github.io/popone/src/img/result_chicken.png', alt: 'result_chicken', url: 'https://popone.kr/729973229/?idx=50' },
            { src: 'https://journey-han.github.io/popone/src/img/result_duck.png', alt: 'result_duck', url: 'https://popone.kr/729973229/?idx=51' },
            { src: 'https://journey-han.github.io/popone/src/img/result_lamb.png', alt: 'result_lamb', url: 'https://popone.kr/729973229/?idx=52' },
            { src: 'https://journey-han.github.io/popone/src/img/result_horse.png', alt: 'result_horse', url: 'https://popone.kr/729973229/?idx=53' },
            { src: 'https://journey-han.github.io/popone/src/img/result_fish.png', alt: 'result_fish', url: 'https://popone.kr/729973229/?idx=54' }
        ];

        if (key === 'allergy') {
            // 조건에 따라 추가할 이미지 배열
            let additionalImages = value.flatMap(value => {
                if (value === '돼지') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result_pork.png', alt: 'result_pork', url: 'https://popone.kr/729973229/?idx=48' };
                } else if (value === '소') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result_beef.png', alt: 'result_beef', url: 'https://popone.kr/729973229/?idx=49' };
                } else if (value === '닭' || value === '칠면조') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result_chicken.png', alt: 'result_chicken', url: 'https://popone.kr/729973229/?idx=50' };
                } else if (value === '오리') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result_duck.png', alt: 'result_duck', url: 'https://popone.kr/729973229/?idx=51' };
                } else if (value === '양') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result_lamb.png', alt: 'result_lamb', url: 'https://popone.kr/729973229/?idx=52' };
                } else if (value === '말') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result_horse.png', alt: 'result_horse', url: 'https://popone.kr/729973229/?idx=53' };
                } else if (value === '흰살생선' || value === '연어') {
                    return { src: 'https://journey-han.github.io/popone/src/img/result_fish.png', alt: 'result_fish', url: 'https://popone.kr/729973229/?idx=54' };
                } else {
                    return [];
                }
            });

            reImages = images.filter(image =>
                !additionalImages.some(addImage => addImage.src === image.src && addImage.alt === image.alt)
            );

            // 슬라이드 HTML 생성
            let slidesHTML = reImages.map(image => `
        <div class="swiper-slide">
            <div class="re_img">
                <img src="${image.src}" alt="${image.alt}">
                </br>
                <a href="${image.url}" target="blank"><img src="https://journey-han.github.io/popone/src/img/buyButton.png" id="buyButton"></a>
                </br>
            </div>
        </div>
    `).join('');
            //전체 슬라이더 HTML 반환 및 추가
            let sliderHTML = `
            <h3><span id="petName">${petName}</span>의 하루 권장 칼로리는 
            <br><span id="resultKcal">${calculationResult}Kcal</span>입니다!</h3>
            <br>
            <div class="tick-bar">
                    <div class="current-value" id="current-value" style="font-size: 40px">▼</div>

                    <div class="tick large" style="left: 0%;" id="tick-0"></div>
                    <div class="tick" style="left: 10%;" id="tick-1"></div>
                    <div class="tick" style="left: 20%;" id="tick-2"></div>
                    <div class="tick" style="left: 30%;" id="tick-3"></div>
                    <div class="tick large" style="left: 40%;" id="tick-4"></div>
                    <div class="tick" style="left: 50%;" id="tick-5"></div>
                    <div class="tick" style="left: 60%;" id="tick-6"></div>
                    <div class="tick large" style="left: 70%;" id="tick-7"></div>
                    <div class="tick" style="left: 80%;" id="tick-8"></div>
                    <div class="tick" style="left: 90%;" id="tick-9"></div>
                    <div class="tick large" style="left: 100%;" id="tick-10"></div>

                    <div class="tick-label" id="label-0" style="left: 0%;">0</div>
                    <div class="tick-label" id="label-1" style="left: 10%;">1</div>
                    <div class="tick-label" id="label-2" style="left: 20%;">2</div>
                    <div class="tick-label" id="label-3" style="left: 30%;">3</div>
                    <div class="tick-label" id="label-4" style="left: 40%;">4</div>
                    <div class="tick-label" id="label-5" style="left: 50%;">5</div>
                    <div class="tick-label" id="label-6" style="left: 60%;">6</div>
                    <div class="tick-label" id="label-7" style="left: 70%;">7</div>
                    <div class="tick-label" id="label-8" style="left: 80%;">8</div>
                    <div class="tick-label" id="label-9" style="left: 90%;">9</div>
                    <div class="tick-label" id="label-10" style="left: 100%;">10</div>
                </div>
                <br>
            <br>
            <br>
            <br>
            <h3><span id="petName">${petName}</span>의 맞춤식을 추천해드릴게요!<h3>
            <div class="slider-container">
            </div>
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
            //loadProducts();
        }
    });

    /*
    document.getElementById('productFrame').onload = function() {
        let iframe = document.getElementById('productFrame').contentDocument || document.getElementById('productFrame').contentWindow.document;
        
        // 상품 정보를 iframe 내에서 추출
        let products = iframe.querySelectorAll('.product-class'); // 적절한 셀렉터로 대체
        products.forEach(product => {
            let name = product.querySelector('.product-name').innerText;
            let price = product.querySelector('.product-price').innerText;
            let imageUrl = product.querySelector('img').src;
            
            console.log({ name, price, imageUrl }); // 상품 정보 출력
        });
    };
    */

    updateSliderValues(newCurrentValue, newTickValues);

    // Swiper 스타일 및 스크립트 로드
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://journey-han.github.io/popone/src/css/swiper.css';
    document.head.appendChild(link);

    let script = document.createElement('script');
    script.src = "https://journey-han.github.io/popone/src/js/swiper.min.js";
    document.body.appendChild(script);
    script.onload = () => {
        let swiperOptions = {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        };
        if (reImages.length > 1) {
            swiperOptions.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            };
        }
        new Swiper('.swiper-container', swiperOptions);

        /*
        let otherGoodsSwiperOptions = {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
            pagination: {
                el: '.otherGoods_swiper-pagination',
                clickable: true,
            }
        };

        if (otherProducts.length > 1) {
            otherGoodsSwiperOptions.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            };
        }
        // Initialize Swiper for the other goods section
        new Swiper('.otherGoods_swiper-container', otherGoodsSwiperOptions);
        */
    };
}

// 진행바 업데이트 함수
function updateProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    let progress = ((currentStep + 2) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function updateProgressBarM() {
    let progressBar = document.getElementById('progress-bar');
    let progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

// 페이지 로드 시 첫 스텝 렌더링
window.onload = () => {
    renderStep(steps[currentStep]);
};

// 칼로리 계산 함수
function calculate(weight, age, neutered, condition) {
    let exponent1, exponent2, minResult, maxResult;

    if (age >= 7) {
        exponent1 = fectors.senior[neutered ? 'neuteredY' : 'neuteredN'];
        return ((weight * 30) + 70) * exponent1;
    } else {
        exponent1 = fectors.adult[neutered];
        if (condition === 'overweight') {
            exponent2 = fectors.adult.overweight;
            minResult = ((weight * 30) + 70) * exponent2;
            maxResult = ((weight * 30) + 70) * exponent1;
            return Math.round(minResult) + ' ~ ' + Math.round(maxResult);
        } else if (condition === 'obese') {
            exponent2 = fectors.adult.obese;
            minResult = ((weight * 30) + 70) * exponent2;
            maxResult = ((weight * 30) + 70) * exponent1;
            return Math.round(minResult) + ' ~ ' + Math.round(maxResult);
        } else {
            return ((weight * 30) + 70) * exponent1;
        }
    }
}

// 생일로 나이 계산 함수
function calculateAge(birthdate) {
    let birth = new Date(birthdate);
    let today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    let monthDifference = today.getMonth() - birth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

// 유효성 검사 함수
function validChk() {
    let nameField = document.getElementsByName('name')[0];
    if (nameField && nameField.value === "") {
        alert("잘못된 이름 형식입니다. 한글로 정확히 입력해주세요.");
        nameField.focus();
        return false;
    }

    let birthYear = document.getElementsByName('birth1')[0];
    let birthMonth = document.getElementsByName('birth2')[0];
    if (birthYear && birthMonth && (!birthYear.value || !birthMonth.value)) {
        alert("잘못된 날짜 형식입니다.");
        birthYear.focus();
        return false;
    }

    let genderField = document.getElementsByName('gender');
        if (genderField.length > 0) {
            let selectedGender = Array.from(genderField).some(option => option.checked);
            if (!selectedGender) {
                alert("성별을 선택해주세요!")
                return false;
            }
        }

        let neuteredField = document.getElementsByName('neutered');
        if (neuteredField.length > 0) {
            let selectedNeutered = Array.from(neuteredField).some(option => option.checked);
            if (!selectedNeutered) {
                alert("중성화 여부를 선택해주세요!")
                return false;
            }
        }

        let breedField = document.getElementsByName('breed');
        if (breedField.length > 0) {
            let selectedBreed = document.getElementsByName('breed')[0];
            if (selectedBreed.value === '') {
                alert("견종을 입력해주세요!");
                selectedBreed.focus();
                return false;
            }
        }

        let weightField = document.getElementsByName('weight');
        if (weightField.length > 0) {
            let selectedWeight = document.getElementsByName('weight')[0];
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

        let lifeStyleField = document.getElementsByName('lifeStyle');
        if (lifeStyleField.length > 0) {
            let selectedLifStyle = Array.from(lifeStyleField).some(option => option.checked);
            if (!selectedLifStyle) {
                alert("활동량을 선택해주세요!")
                return false;
            }
        }

        let bodyTypeField = document.getElementsByName('bodyType');
        if (bodyTypeField.length > 0) {
            let selectedBodyType = Array.from(bodyTypeField).some(option => option.checked);
            if (!selectedBodyType) {
                alert("체형을 선택해주세요!")
                return false;
            }
        }

        let mealTimeField = document.getElementsByName('mealTime');
        if (mealTimeField.length > 0) {
            let selectedMealTime = Array.from(mealTimeField).some(option => option.checked);
            if (!selectedMealTime) {
                alert("식사량을 선택해주세요!")
                return false;
            }
        }

        let snackTextureField = document.getElementsByName('snackTexture');
        if (snackTextureField.length > 0) {
            let selectedSnack = Array.from(snackTextureField).some(option => option.checked);
            if (!selectedSnack) {
                alert("간식 식감을 선택해주세요!")
                return false;
            }
        }

        let allergyField = document.getElementsByName('allergy');
        if (allergyField.length > 0) {
            let sltdAllergy = Array.from(allergyField).some(option => option.checked);
            if (!sltdAllergy) {
                alert("알러지 식재료를 선택해주세요!")
                return false;
            }
        }

    return true;
        
}

let otherProducts = [ 
    {
        "id": 1,
        "idx" : 55,
        "name": "DUCK'S SYRINX",
        "price": "6,500원",
        "discount_price": "5,850원",
        "sale_percentage": "10%",
        "time_sale_info": "",
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240911/8bfb21d89260a.jpg"
    },
    {
        "id": 2,
        "idx" : 13,
        "name": "EGGPLANT TURKEY BISCUIT",
        "price": "7,000원",
        "discount_price": "6,650원",
        "sale_percentage": "5%",
        "time_sale_info": "",
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/b743d4c4d5f3c.jpg"
    },
    {
        "id": 3,
        "idx" : 14,
        "name": "GREAT JOB DUCK TREATS",
        "price": "6,500원",
        "discount_price": "6,175원",
        "sale_percentage": "5%",
        "time_sale_info": "",
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/76fba3ad04975.jpg"
    },
    {
        "id": 4,
        "name": "GREAT JOB CHICKEN TREATS",
        "price": "6,000원",
        "discount_price": "5,700원",
        "sale_percentage": "5%",
        "time_sale_info": "",
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/26c1d50c9ed0c.jpg"
    },
    {
        "id": 5,
        "name": "GREAT JOB SALMON TREATS",
        "price": "7,500원",
        "discount_price": "7,125원",
        "sale_percentage": "5%",
        "time_sale_info": "",
        "icons": [
            "sale item badge",
            "timesale item badge",
            "timesale item badge"
        ],
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/17f504627c813.jpg"
    },
    {
        "id": 6,
        "name": "GREAT JOB TURKEY TREATS",
        "price": "7,000원",
        "discount_price": "6,650원",
        "sale_percentage": "5%",
        "time_sale_info": "",
        "icons": [
            "sale item badge",
            "timesale item badge",
            "timesale item badge"
        ],
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/33d1dcb4d45d4.jpg"
    },
    {
        "id": 7,
        "name": "DUCK'S CARTILAGE",
        "price": "6,500원",
        "discount_price": "5,850원",
        "sale_percentage": "10%",
        "time_sale_info": "",
        "icons": [
            "sale item badge",
            "timesale item badge",
            "timesale item badge"
        ],
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/566ee0930697e.jpg"
    },
    {
        "id": 8,
        "name": "DUCK ENERGY BAR",
        "price": "6,800원",
        "discount_price": "6,460원",
        "sale_percentage": "5%",
        "time_sale_info": "",
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/74998c94e6331.jpg"
    },
    {
        "id": 9,
        "name": "TURKEY'S NECK",
        "price": "6,000원",
        "discount_price": "5,400원",
        "sale_percentage": "10%",
        "time_sale_info": "",
        "icons": [
            "sale item badge",
            "timesale item badge",
            "timesale item badge"
        ],
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/d369bb93beb95.jpg"
    },
    {
        "id": 10,
        "name": "DUCK'S FEET",
        "price": "6,000원",
        "discount_price": "5,400원",
        "sale_percentage": "10%",
        "time_sale_info": "",
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/31e22cb4954af.jpg"
    },
    {
        "id": 11,
        "name": "CARROT&DUCK ON LAMB",
        "price": "6,500원",
        "discount_price": "6,175원",
        "sale_percentage": "5%",
        "time_sale_info": "",
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/7ef6ab8c85dbb.jpg"
    },
    {
        "id": 12,
        "name": "EGGPLANT CHICKEN BISCUIT",
        "price": "6,500원",
        "discount_price": "6,175원",
        "sale_percentage": "5%",
        "time_sale_info": "",
        "imageUrl": "https://cdn.imweb.me/thumbnail/20240622/256501fa34974.jpg"
    }];
    
    // 제품을 HTML로 변환하는 함수
    function createProductHTML(otherProduct) {
        return `
        <div class="swiper-slide shop-item _shop_item" style="width: 356px; padding: 0px 15px; height: 554px;">
            <div class="item-wrap" style="position: relative;">
                <a href="https://popone.kr/21/?idx=${otherProduct.id}" class="_fade_link shop-item-thumb hover_img_none">
                    <img alt="${otherProduct.name}" src="${otherProduct.imageUrl}" class="_org_img org_img _lazy_img" style="display: inline;">
                    <div class="item-overlay">
                        <div class="item-pay">
                            <h2>${otherProduct.name}</h2>
                            <p class="sale_price no-margin body_font_color_50" style="opacity: 1">
                                ${otherProduct.price}
                            </p>
                            ${otherProduct.discount_price ? `<p class="no-margin special-sale-wrap">
                                <span class="sale_percentage">${otherProduct.sale_percentage}</span>
                                <span class="pay" style="font-size:14px; color:#729189">
                                    ${otherProduct.discount_price}
                                </span>
                            </p>` : ''}
                        </div>
                    </div>
                </a>
            </div>
        </div>`;
    }

    /*
// 제품 데이터를 사용하여 슬라이드에 추가
function loadProducts() {
    let sliderContainer = document.getElementById('otherGoods_swiper-wrapper');
    otherProducts.forEach(otherProduct => {
        sliderContainer.innerHTML += createProductHTML(otherProduct);
    });
}

// JSON 파일에서 데이터를 가져오는 함수
async function fetchProducts() {
    try {
        let response = await fetch('https://journey-han.github.io/popone/src/json/productsSnack.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}


// DOM이 준비되면 JSON 파일에서 제품을 가져와서 슬라이드에 추가

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts().then(products => {
        loadProducts(products);

        // Swiper 슬라이드 초기화
        var swiper = new Swiper('.otherGoods_swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    });
});
*/

