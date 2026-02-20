#Todoリストの内容を保存するためのリストを作る
todo_list = []
#タスクを追加したときのIDを管理するための変数
task_id = 1

# ========================================
#タスクを追加
def add_task(text):
#関数内でローカルにならないように、グローバル変数を宣言
    global task_id
    text = text.strip()

    if not text:
        print('タスクの内容を入力してください。')
        return
    #新しいタスクの辞書を作成
    new_todo = {
        'id' : task_id,
        'text': text,
        'completed': False
    }
    #リストに新しいタスクを追加
    todo_list.append(new_todo)
    #次のIDを1増やす
    task_id += 1
    print(f'タスク「{text}」を追加しました。')

# ========================================
#タスクを表示
def show_todos():
    if not todo_list:
        print('タスクがありません。')
        return
    #\nは改行を意味する特殊文字
    print('\n--- ToDoリスト ---')
    for todo in todo_list:
        task_id = todo['id']
        text = todo['text']
        completed = todo['completed']
        status = '完了' if completed else '未完了'
        print(f'ID: {task_id}, タスク: {text}, 状態: {status}')
    print('-' * 30)

#タスクのcompeltedをTrueにする
def complete_task(task_id):
    #タスクのIdを引数にして、リストから該当するタスクを探すのでfor文にif文を組み合わせる
    for todo in todo_list:
        if todo['id'] == task_id:
            #タスクの完了状態を反転させる
            todo['completed'] = not todo['completed']
            status = '完了' if todo['completed'] else '未完了'
            if todo['completed']:
                print(f'タスク「{todo["text"]}」を完了にしました。')
            else:
                print(f'タスク「{todo["text"]}」を未完了にしました。')
            return
    print(f'ID {task_id} のタスクが見つかりませんでした。')

#タスクを削除する関数
def delete_task(task_id):
    global todo_list
    for todo in todo_list:
        if todo['id'] == task_id:
            #新しいリストを作る。if文はもしtask_idとtask['id']が等しくない場合にタスクを新しいリストに追加する
            todo_list = [task for task in todo_list if task['id'] != task_id]
            print(f'タスク「{todo["text"]}」を削除しました。')
            return
    print(f'ID {task_id} のタスクが見つかりませんでした。')

#ユーザーからの入力を処理する関数
def show_menu():
    print('\n--- メニュー ---')
    print('1. タスクを追加')
    print('2. タスクを表示')
    print('3. タスクを完了/未完了にする')
    print('4. タスクを削除')
    print('5. 終了')

#実際にプログラムを動かす関数
def main():
    while True:
        show_menu()
        selection = input('選択肢を入力してください: ').strip()
        #ユーザーの入力に応じて、タスクを追加する
        if selection == '1':
            text = input('タスクの内容を入力してください: ')
            add_task(text)
        elif selection == '2':
            show_todos()
        elif selection == '3':
            #try-except文を使って、ユーザーが数字以外を入力したときにエラーが出ないようにする
            #tryはエラーが出る可能性のあるコードを囲む
            #exceptはエラーが出たときに実行されるコードを囲む
            try:
                task_id = int(input('完了/未完了にするタスクのIDを入力してください: '))
                complete_task(task_id)
            except ValueError:
                print('無効なIDです。数字を入力してください。')
        elif selection == '4':
            try:
                task_id = int(input('削除するタスクのIDを入力してください: '))
                delete_task(task_id)
            except ValueError:
                print('無効なIDです。数字を入力してください。')
        elif selection == '5':
            print('プログラムを終了します。')
            break
        else:
            print('無効な選択肢です。半角数字の1から5を入力してください。')


if __name__ == '__main__':
    main()