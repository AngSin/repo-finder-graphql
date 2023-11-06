import { useDebounce } from "../useDebounce";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the same value after long delay", () => {
    const { result } = renderHook(() => useDebounce("test", 500));

    expect(result.current).toBe("test");
    // Fast-forward
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current).toBe("test");
  });

  it("should return the latest value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "test", delay: 500 },
      },
    );

    expect(result.current).toBe("test");

    // Value is same if checked right after
    rerender({ value: "test updated", delay: 500 });
    expect(result.current).toBe("test");

    // Fast-forward
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current).toBe("test updated");
  });

  it("should cancel the timeout on unmount", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const { unmount } = renderHook(() => useDebounce("test", 500));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
