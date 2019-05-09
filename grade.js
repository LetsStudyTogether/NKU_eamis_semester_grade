function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main_func() {
    document.querySelector("#menu_panel > ul > li.expand > ul > div > li:nth-child(10) > a").click()
    await sleep(2000);
    $("div[title='所有学期成绩']").click()
    var line = 1;
    var semesters = new Array();
    var semesters_grades = new Array();
    var semesters_credit = new Array();
    var semesters_course_type = new Array();
    var sum_grade = 0.0;
    var sum_grade_abcd = 0.0;
    var sum_grade_abc = 0.0;
    var sum_grade_credit = 0.0;
    var sum_grade_credit_abcd = 0.0;
    var sum_grade_credit_abc = 0.0;
    await sleep(2000);
    while (1) {
        if (!document.querySelector("tbody[id*='data'] > tr:nth-child(" + line + ")")) {
            break;
        }
        let current_seme = document.querySelector("tbody[id*='data'] > tr:nth-child(" + line + ") > td:nth-child(1)").textContent;
        let current_seme_num = semesters.indexOf(current_seme);
        if (current_seme_num === -1) {
            semesters.push(current_seme);
            semesters_grades.push(new Array());
            semesters_credit.push(new Array());
            semesters_course_type.push(new Array());
            semesters_grades[semesters_grades.length - 1].push(document.querySelector("tbody[id*='data'] > tr:nth-child(" + line + ") > td:nth-child(8)").textContent.trim());
            semesters_credit[semesters_grades.length - 1].push(document.querySelector("tbody[id*='data'] > tr:nth-child(" + line + ") > td:nth-child(6)").textContent.trim());
            semesters_course_type[semesters_grades.length - 1].push(document.querySelector("tbody[id*='data'] > tr:nth-child(" + line + ") > td:nth-child(5)").textContent.trim());
        }
        else {
            semesters_grades[current_seme_num].push(document.querySelector("tbody[id*='data'] > tr:nth-child(" + line + ") > td:nth-child(8)").textContent.trim());
            semesters_credit[current_seme_num].push(document.querySelector("tbody[id*='data'] > tr:nth-child(" + line + ") > td:nth-child(6)").textContent.trim());
            semesters_course_type[current_seme_num].push(document.querySelector("tbody[id*='data'] > tr:nth-child(" + line + ") > td:nth-child(5)").textContent.trim());
        }
        line++;
    }
    for (let i = 0; i < semesters.length; i++) {
        let current_seme_grade_sum = 0.0;
        let current_seme_credit_sum = 0.0;
        let current_seme_grade_sum_abc = 0.0;
        let current_seme_credit_sum_abc = 0.0;
        let current_seme_grade_sum_abcd = 0.0;
        let current_seme_credit_sum_abcd = 0.0;
        for (let j = 0; j < semesters_grades[i].length; j++) {
            let current_course_grade = parseFloat(semesters_grades[i][j]);
            let current_course_credit = parseFloat(semesters_credit[i][j]);
            let current_course_type = semesters_course_type[i][j];
            if (current_course_grade) {
                //console.log(parseFloat(semesters_grades[i][j]));
                current_seme_grade_sum += current_course_grade * current_course_credit;
                current_seme_credit_sum += current_course_credit;
                sum_grade += current_course_grade * current_course_credit;
                sum_grade_credit += current_course_credit;
                if (current_course_type != "任选课") {
                    current_seme_grade_sum_abcd += current_course_grade * current_course_credit;
                    current_seme_credit_sum_abcd += current_course_credit;
                    sum_grade_abcd += current_course_grade * current_course_credit;
                    sum_grade_credit_abcd += current_course_credit;
                    if (current_course_type != "专业选修课") {
                        current_seme_grade_sum_abc += current_course_grade * current_course_credit;
                        current_seme_credit_sum_abc += current_course_credit;
                        sum_grade_abc += current_course_grade * current_course_credit;
                        sum_grade_credit_abc += current_course_credit;
                    }
                }
            }
        }
        let abcde;
        if (current_seme_grade_sum / current_seme_credit_sum)
            abcde = (current_seme_grade_sum / current_seme_credit_sum).toPrecision(5);
        else
            abcde = "该学期没有修过此类课程或均为通过制";
        let abcd;
        if (current_seme_grade_sum_abcd / current_seme_credit_sum_abcd)
            abcd = (current_seme_grade_sum_abcd / current_seme_credit_sum_abcd).toPrecision(5);
        else
            abcde = "该学期没有修过此类课程或均为通过制";
        let abc;
        if (current_seme_grade_sum_abc / current_seme_credit_sum_abc)
            abc = (current_seme_grade_sum_abc / current_seme_credit_sum_abc).toPrecision(5);
        else
            abc = "该学期没有修过此类课程或均为通过制";
        console.log(semesters[i] + " : " + abcde +
            " ABC: " + abc +
            " ABCD: " + abcd);
        //console.log(current_seme_credit_sum);
        //console.log(current_seme_grade_sum);
    }
    console.log("总和 : " + (sum_grade / sum_grade_credit).toPrecision(5) +
        " ABC: " + (sum_grade_abc / sum_grade_credit_abc).toPrecision(5) +
        " ABCD: " + (sum_grade_abcd / sum_grade_credit_abcd).toPrecision(5))
}

main_func();
