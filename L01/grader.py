students = [
    {'name': 'John', 'score': 57},
    {'name': 'Alice', 'score': 89},
    {'name': 'Bob', 'score': 77}
]

def get_grade(score):
    if 80 <= score <= 100:
        return 'A'
    elif 70 <= score <= 79:
        return 'B'
    elif 60 <= score <= 69:
        return 'C'
    elif 50 <= score <= 59:
        return 'D'
    else:
        return 'F'

def sort_student(student_list):
    return sorted(student_list, key=lambda student: student['score'], reverse=True)

def average_score(student_list):
    if not student_list:
        return 0.0
    total_score = sum(student['score'] for student in student_list)
    return total_score / len(student_list)

def get_grade_summary(student_list):
    summary = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0}
    for student in student_list:
        grade = get_grade(student['score'])
        summary[grade] += 1
    return summary

def run_grader(student_list):
    sorted_students = sort_student(student_list)
    summary = get_grade_summary(student_list)
    avg_score = average_score(student_list)

    # พิมพ์ผลลัพธ์
    print(summary)
    print(f"Average score: {avg_score:.2f}")
    for student in sorted_students:
        name = student['name']
        score = student['score']
        grade = get_grade(score)
        print(f"Name: {name}, Score : {score}, Grade: {grade}")

if __name__ == "__main__":
    run_grader(students)
