$(function () {
  // Display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Create time blocks dynamically
  function createTimeBlocks() {
    const timeBlockContainer = $('.container-lg');
    const startHour = 9; // Starting hour in 24-hour format
    const endHour = 17; // Ending hour in 24-hour format

    for (let i = startHour; i <= endHour; i++) {
      const hourText = i < 12 ? `${i}AM` : i === 12 ? `${i}PM` : `${i - 12}PM`;

      const timeBlock = $(`
        <div id="hour-${i}" class="row time-block">
          <div class="col-2 col-md-1 hour text-center py-3">${hourText}</div>
          <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      `);

      timeBlockContainer.append(timeBlock);
    }
  }

  // Apply the past, present, or future class to each time block.
  function updateTimeBlockStyles() {
    const currentHour = dayjs().hour();
    $('.time-block').each(function () {
      const timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
      
      if (timeBlockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  function loadSavedDescriptions() {
    $('.time-block').each(function () {
      const id = $(this).attr('id');
      const savedDescription = localStorage.getItem(id);

      if (savedDescription) {
        $(this).find('.description').val(savedDescription);
      }
    });
  }

  // Add a listener for click events on the save button.
  function addSaveBtnClickListener() {
    $('.saveBtn').on('click', function () {
      const timeBlock = $(this).closest('.time-block');
      const id = timeBlock.attr('id');
      const description = timeBlock.find('.description').val();

      localStorage.setItem(id, description);
    });
  }

  createTimeBlocks();
  updateTimeBlockStyles();
  loadSavedDescriptions();
  addSaveBtnClickListener();

  // Update time block styles every minute.
  setInterval(updateTimeBlockStyles, 60000);
});
