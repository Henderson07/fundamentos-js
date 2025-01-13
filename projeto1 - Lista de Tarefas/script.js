$(document).ready(function () {
    // Carregar tarefas salvas localmente
    loadTasks();
  
    // Adicionar tarefa
    $('#addTaskBtn').on('click', function () {
      var taskText = $('#taskInput').val();
      if (taskText.trim() !== '') {
        addTask(taskText);
        saveTasks();
        $('#taskInput').val('');
      }
    });
  
    // Marcar/desmarcar tarefa como concluída
    $(document).on('click', 'li', function () {
      $(this).toggleClass('completed');
      saveTasks();
    });
  
    // Remover tarefa
    $(document).on('click', 'span', function (e) {
      e.stopPropagation(); // Evitar a propagação do evento para o elemento pai (li)
      $(this).parent().fadeOut(500, function () {
        $(this).remove();
        saveTasks();
      });
    });
  
    // Função para adicionar tarefa
    function addTask(text) {
      $('#taskList').append('<li><span>&times;</span>' + text + '</li>');
    }
  
    // Função para carregar tarefas salvas localmente
    function loadTasks() {
      var tasks = localStorage.getItem('tasks');
      if (tasks) {
        $('#taskList').html(tasks);
      }
    }
  
    // Função para salvar tarefas localmente
    function saveTasks() {
      var tasks = $('#taskList').html();
      localStorage.setItem('tasks', tasks);
    }
  });