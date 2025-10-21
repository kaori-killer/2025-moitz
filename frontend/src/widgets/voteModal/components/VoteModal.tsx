import { useState } from 'react';

import Modal from '@features/modal/components/Modal';

import BottomButton from '@shared/components/bottomButton/BottomButton';
import { flex, typography } from '@shared/styles/default.styled';

import IconLogo from '@icons/logo-icon.svg';

import * as voteModal from './voteModal.styled';

const voteOptions = [
  { id: 'gangnam', name: '강남역', count: 5 },
  { id: 'hongdae', name: '홍대입구역', count: 3 },
  { id: 'jamsil', name: '잠실역', count: 2 },
  { id: 'myeongdong', name: '명동역', count: 1 },
  { id: 'itaewon', name: '이태원역', count: 4 },
];

const BUTTON_TEXT = '투표하기';

interface VoteModalProps {
  onClose: () => void;
}

function VoteModal({ onClose }: VoteModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (id: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((optionId) => optionId !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <Modal onClose={onClose}>
      <main
        css={flex({
          direction: 'column',
          justify: 'center',
          align: 'center',
          gap: 20,
        })}
      >
        <header css={flex({ direction: 'column', align: 'center', gap: 10 })}>
          <div css={flex({ align: 'center', gap: 10 })}>
            <img src={IconLogo} alt="로고 아이콘" css={voteModal.icon()} />
            <h1 css={[typography.h1, voteModal.title()]}>어디로 갈까요?</h1>
          </div>
          <div css={flex({ direction: 'column', align: 'center', gap: 5 })}>
            <p css={[typography.b2, voteModal.description()]}>
              투표로 만날 지역을 정해보세요!
            </p>
            <p css={[typography.c1, voteModal.subDescription()]}>
              링크를 받은 사람들과 투표할 수 있어요
            </p>
          </div>
        </header>

        <section
          css={[
            flex({ direction: 'column', align: 'center', gap: 5 }),
            voteModal.candidateListWrapper(),
          ]}
        >
          <div
            css={
              (flex({ justify: 'flex-end', align: 'center' }),
              voteModal.resetButtonWrapper())
            }
          >
            <button css={[voteModal.resetButton()]} type="button">
              새로고침
            </button>
          </div>

          <form
            css={[
              flex({ direction: 'column', align: 'center', gap: 5 }),
              voteModal.candidateList(),
            ]}
          >
            {voteOptions.map((option) => (
              <div
                key={option.id}
                css={[
                  flex({ justify: 'space-between', align: 'center', gap: 8 }),
                  voteModal.voteOption(),
                ]}
              >
                <input
                  type="checkbox"
                  id={option.id}
                  name="vote-option"
                  value={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionChange(option.id)}
                  css={voteModal.checkbox()}
                />
                <label
                  htmlFor={option.id}
                  css={[typography.b2, voteModal.candidateName()]}
                >
                  {option.name}
                </label>
                <span css={[typography.c1, voteModal.voteCount()]}>
                  {option.count}명
                </span>
              </div>
            ))}
          </form>
        </section>

        <footer>
          <BottomButton
            text={BUTTON_TEXT}
            onClick={onClose}
            type="button"
            active={true}
          />
        </footer>
      </main>
    </Modal>
  );
}

export default VoteModal;
