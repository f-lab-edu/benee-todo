# 페이지네이션 유틸 TC

## 테스트 범위

페이지네이션 유틸 (`paginate()`)

```typescript
export const paginate = <T>(
  page: number,
  list: Array<T>,
  size: number = PAGE_SIZE
) => {
  return list.slice((page - 1) * size, page * size) ?? [];
};
```

## 테스트 케이스 목록

### 정상 동작

#### TC1. page > 0, size> 0일 경우 올바른 항목을 반환한다.

- Given: list.length > page \* size 인 list, 양수 page, 양수 size
- When: paginate 함수 호출
- Then: list의 ((page - 1) _ size) ~ (page _ size - 1) 인덱스 사이의 배열을 반환한다. page \* size 이후의 요소 개수가 size보다 작을 경우 남아있는 요소들을 반환한다.

#### TC2. page > 0, size가 생략된 경우 size가 PAGE_SIZE로 적용된 항목을 반환한다.

- Given: list.length > ((page - 1) \* PAGE_SIZE) 인 list, 양수 page
- When: paginate 함수 호출
- Then: list의 ((page - 1) _ PAGE_SIZE) ~ ((page _ PAGE_SIZE) - 1) 인덱스 사이의 배열을 반환한다. (page - 1) \* PAGE_SIZE) 이후의 요소 개수가 PAGE_SIZE보다 작을 경우 남아있는 요소들을 반환한다.

### 예외 동작

#### TC3. page 가 전체 페이지 수보다 클 경우 빈 배열을 반환한다

- Given: 1개 이상의 요소를 가진 list, (page - 1) \* size >= list.length인 page, 양수 size
- When: paginate 함수 호출
- Then: 빈 배열을 반환한다.

#### TC4. list가 빈 배열일 경우 page, size에 관계 없이 빈 배열을 반환한다

- Given: 빈 배열인 list, 양수 page, 양수 size
- When: paginate 함수 호출
- Then: 빈 배열을 반환한다.

#### TC5. size가 양수가 아닐 경우 빈 배열을 반환한다

- Given: 1개 이상의 요소를 가진 list, 양수 page, 0보다 작거나 같은 size
- When: paginate 함수 호출
- Then: 빈 배열을 반환한다.

#### TC6. page가 양수가 아닐 경우 빈 배열을 반환한다

- Given: 1개 이상의 요소를 가진 list, 0보다 작거나 같은 page, 양수 size
- When: paginate 함수 호출
- Then: 빈 배열을 반환한다.

## 추가 설명

- PAGE_SIZE는 상수 3
- 해당 함수는 리스트 요소의 타입에 의존하지 않고 순서 기반으로만 slice를 수행하므로 요소 타입에 따른 테스트는 생략함.
