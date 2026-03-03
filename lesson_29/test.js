// завдання виконую, по тому,
//  як викладач казав на занятті
// 1

describe("ageClassification", () => {
  it(" повертає Дитинство", () => {
    expect(ageClassification(0)).toBe("Дитинство");
    expect(ageClassification(13)).toBe("Дитинство");
    expect(ageClassification(24)).toBe("Дитинство");
  });
  it(" повертає Молодість", () => {
    expect(ageClassification(25)).toBe("Молодість");
    expect(ageClassification(44)).toBe("Молодість");
  });
  it(" повертає Зрілість", () => {
    expect(ageClassification(45)).toBe("Зрілість");
    expect(ageClassification(65)).toBe("Зрілість");
  });
  it(" повертає Старість", () => {
    expect(ageClassification(66)).toBe("Старість");
    expect(ageClassification(75)).toBe("Старість");
  });
  it(" повертає Довголіття", () => {
    expect(ageClassification(76)).toBe("Довголіття");
    expect(ageClassification(90)).toBe("Довголіття");
  });
  it(" повертає Рекорд", () => {
    expect(ageClassification(91)).toBe("Рекорд");
    expect(ageClassification(122)).toBe("Рекорд");
  });
});

// 2

describe("Повертає день тижня", () => {
  it(" повертає Понеділок", () => {
    expect(weekFn(1)).toBe("Понеділок");
  });
  it(" повертає  Середу", () => {
    expect(weekFn(3)).toBe("Середа");
  });
  it(" повертає  Суботу", () => {
    expect(weekFn(6)).toBe("Субота");
  });
});
